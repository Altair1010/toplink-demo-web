#!/usr/bin/env bash
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
# shellcheck source=common.sh
. "$SCRIPT_DIR/common.sh"

require_command git
require_command openssl
require_command sed
require_command docker
repository_sha=$(git -C "$REPO_DIR" rev-parse HEAD) || die "Repository HEAD is unavailable"

replace_once() {
  key=$1
  value=$2
  sed -i "s|^${key}=.*$|${key}=${value}|" "$ENV_FILE"
}

if [ ! -f "$ENV_FILE" ]; then
  umask 077
  cp "$DEPLOY_DIR/env.example" "$ENV_FILE"
fi
chmod 600 "$ENV_FILE"

if grep -q '^TOPLINK_DEPLOY_SHA=REPLACE_ON_SERVER' "$ENV_FILE"; then
  replace_once TOPLINK_DEPLOY_SHA "$repository_sha"
fi
for key in TOPLINK_DB_PASSWORD TOPLINK_DB_ROOT_PASSWORD TOPLINK_WEBHOOK_SECRET TOPLINK_PREVIEW_SECRET TOPLINK_WP_ADMIN_PASSWORD; do
  if grep -q "^${key}=REPLACE_ON_SERVER" "$ENV_FILE"; then
    replace_once "$key" "$(openssl rand -hex 32)"
  fi
done

if grep -q 'REPLACE_ON_SERVER' "$ENV_FILE"; then
  printf 'Generated local-only runtime secrets in %s. Set the hostnames and approved operator email values, then rerun this command.\n' "$ENV_FILE" >&2
  exit 2
fi

assert_production_env
[ "$repository_sha" = "$TOPLINK_DEPLOY_SHA" ] || die "Checked-out SHA does not match TOPLINK_DEPLOY_SHA"

compose up -d db wordpress
attempt=0
until compose exec -T wordpress test -f /var/www/html/wp-load.php; do
  attempt=$((attempt + 1))
  [ "$attempt" -lt 60 ] || die "WordPress files did not become ready"
  sleep 2
done

installed=1
if compose run --rm -T wpcli core is-installed >/dev/null 2>&1; then
  installed=0
fi
if [ "$installed" -ne 0 ]; then
  printf '%s\n' "$TOPLINK_WP_ADMIN_PASSWORD" | compose run --rm -T wpcli core install \
    --url="https://$TOPLINK_CMS_HOST" \
    --title='Y Viện Toplink' \
    --admin_user="$TOPLINK_WP_ADMIN_USER" \
    --admin_email="$TOPLINK_WP_ADMIN_EMAIL" \
    --prompt=admin_password \
    --skip-email
  for post_id in 1 2; do
    if compose run --rm -T wpcli post get "$post_id" --field=ID >/dev/null 2>&1; then
      compose run --rm -T wpcli post delete "$post_id" --force >/dev/null
    fi
  done
  compose run --rm -T wpcli option update toplink_site_settings \
    '{"public_display_name":"Y Viện Toplink"}' --format=json >/dev/null
  compose run --rm -T wpcli option update toplink_site_settings_governance \
    '{"public_display_name":{"source":"DECISIONS.md D-001","status":"APPROVED"}}' --format=json >/dev/null
fi

compose run --rm -T wpcli plugin activate toplink-content-model >/dev/null
compose run --rm -T wpcli option update permalink_structure '/%postname%/' >/dev/null
compose run --rm -T wpcli rewrite flush --hard >/dev/null
printf 'WordPress bootstrap completed without printing credentials.\n'
