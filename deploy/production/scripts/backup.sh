#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
# shellcheck source=common.sh
. "$SCRIPT_DIR/common.sh"

require_command docker
require_command gzip
require_command sha256sum
assert_production_env

umask 077
timestamp=$(date -u +%Y%m%dT%H%M%SZ)
backup_root=$TOPLINK_BACKUP_DIR
backup_dir=$backup_root/$timestamp
mkdir -p "$backup_dir"

compose exec -T db sh -ceu \
  'exec mariadb-dump --single-transaction --quick --routines --events -u"$MARIADB_USER" -p"$MARIADB_PASSWORD" "$MARIADB_DATABASE"' \
  | gzip -9 >"$backup_dir/database.sql.gz"
compose exec -T wordpress sh -ceu \
  'mkdir -p /var/www/html/wp-content/uploads; exec tar -czf - -C /var/www/html wp-content/uploads' \
  >"$backup_dir/uploads.tar.gz"

git -C "$REPO_DIR" rev-parse HEAD >"$backup_dir/deploy-sha.txt"
grep -E '^[[:space:]]*image:' "$COMPOSE_FILE" >"$backup_dir/image-locks.txt"
(
  cd "$backup_dir"
  sha256sum database.sql.gz uploads.tar.gz deploy-sha.txt image-locks.txt >SHA256SUMS
)

find "$backup_root" -mindepth 1 -maxdepth 1 -type d -name '20*T*Z' \
  -mtime "+$TOPLINK_BACKUP_RETENTION_DAYS" -exec rm -rf -- {} +
printf 'Backup completed: %s\n' "$backup_dir"
