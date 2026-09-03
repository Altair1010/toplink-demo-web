#!/usr/bin/env bash
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
DEPLOY_DIR=$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)
REPO_DIR=$(CDPATH= cd -- "$DEPLOY_DIR/../.." && pwd)
ENV_FILE=${TOPLINK_ENV_FILE:-$DEPLOY_DIR/.env}
COMPOSE_FILE=$DEPLOY_DIR/compose.yaml

die() {
  printf 'ERROR: %s\n' "$1" >&2
  exit 1
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || die "Required command is unavailable: $1"
}

load_env() {
  [ -f "$ENV_FILE" ] || die "Missing server environment file: $ENV_FILE"
  set -a
  # The production .env file is root/operator-controlled and must be chmod 600.
  # shellcheck disable=SC1090
  . "$ENV_FILE"
  set +a
}

assert_production_env() {
  load_env

  [ "$(stat -c '%a' "$ENV_FILE")" = "600" ] || die "Environment file must have mode 600"
  if grep -q 'REPLACE_ON_SERVER' "$ENV_FILE"; then
    die "Environment file still contains unresolved server placeholders"
  fi
  if grep -Eq '^TOPLINK_INDEXING_ENABLED=1([[:space:]]|$)' "$ENV_FILE"; then
    die "P9 soft launch must keep TOPLINK_INDEXING_ENABLED disabled"
  fi

  case ${TOPLINK_DEPLOY_SHA:-} in
    [0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]) ;;
    *) die "TOPLINK_DEPLOY_SHA must be a full lowercase Git SHA" ;;
  esac
  case ${TOPLINK_PUBLIC_HOST:-} in *.*) ;; *) die "TOPLINK_PUBLIC_HOST must be a DNS hostname" ;; esac
  case ${TOPLINK_CMS_HOST:-} in *.*) ;; *) die "TOPLINK_CMS_HOST must be a DNS hostname" ;; esac
  [ "${TOPLINK_PUBLIC_SITE_URL:-}" = "https://$TOPLINK_PUBLIC_HOST" ] || die "TOPLINK_PUBLIC_SITE_URL must exactly match the HTTPS public host"
  [ "${TOPLINK_CMS_BASE_URL:-}" = "https://$TOPLINK_CMS_HOST/wp-json/toplink/v1" ] || die "TOPLINK_CMS_BASE_URL must exactly match the HTTPS CMS host"
  [ "${TOPLINK_WEBHOOK_URL:-}" = "$TOPLINK_PUBLIC_SITE_URL/api/cms/revalidate" ] || die "TOPLINK_WEBHOOK_URL does not match the public origin"
  [ "${TOPLINK_PREVIEW_WEB_URL:-}" = "$TOPLINK_PUBLIC_SITE_URL/api/cms/preview" ] || die "TOPLINK_PREVIEW_WEB_URL does not match the public origin"
  printf '%s' "${TOPLINK_WEBHOOK_SECRET:-}" | grep -Eq '^[0-9a-f]{64}$' || die "TOPLINK_WEBHOOK_SECRET must be 64 lowercase hex characters"
  printf '%s' "${TOPLINK_PREVIEW_SECRET:-}" | grep -Eq '^[0-9a-f]{64}$' || die "TOPLINK_PREVIEW_SECRET must be 64 lowercase hex characters"
  [ "$TOPLINK_WEBHOOK_SECRET" != "$TOPLINK_PREVIEW_SECRET" ] || die "Webhook and preview secrets must differ"
  printf '%s' "${TOPLINK_DB_PASSWORD:-}" | grep -Eq '^[0-9a-f]{64}$' || die "TOPLINK_DB_PASSWORD must be 64 lowercase hex characters"
  printf '%s' "${TOPLINK_DB_ROOT_PASSWORD:-}" | grep -Eq '^[0-9a-f]{64}$' || die "TOPLINK_DB_ROOT_PASSWORD must be 64 lowercase hex characters"
  printf '%s' "${TOPLINK_WP_ADMIN_PASSWORD:-}" | grep -Eq '^[0-9a-f]{64}$' || die "TOPLINK_WP_ADMIN_PASSWORD must be 64 lowercase hex characters"
  case ${TOPLINK_ACME_EMAIL:-} in *@*.*) ;; *) die "TOPLINK_ACME_EMAIL must be supplied" ;; esac
  case ${TOPLINK_WP_ADMIN_EMAIL:-} in *@*.*) ;; *) die "TOPLINK_WP_ADMIN_EMAIL must be supplied" ;; esac
  case ${TOPLINK_BACKUP_DIR:-} in /*) ;; *) die "TOPLINK_BACKUP_DIR must be an absolute path" ;; esac
  [ "$TOPLINK_BACKUP_DIR" != "/" ] || die "TOPLINK_BACKUP_DIR cannot be the filesystem root"
  printf '%s' "${TOPLINK_BACKUP_RETENTION_DAYS:-}" | grep -Eq '^[1-9][0-9]*$' || die "TOPLINK_BACKUP_RETENTION_DAYS must be a positive integer"
}

compose() {
  docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" "$@"
}
