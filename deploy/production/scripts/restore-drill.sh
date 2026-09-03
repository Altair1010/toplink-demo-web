#!/usr/bin/env bash
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
# shellcheck source=common.sh
. "$SCRIPT_DIR/common.sh"

require_command docker
require_command gzip
require_command sha256sum
assert_production_env

backup_dir=${1:-}
if [ -z "$backup_dir" ]; then
  backup_dir=$(find "$TOPLINK_BACKUP_DIR" -mindepth 1 -maxdepth 1 -type d -name '20*T*Z' | sort | tail -n 1)
fi
[ -n "$backup_dir" ] && [ -d "$backup_dir" ] || die "No backup directory was supplied or found"
backup_dir=$(CDPATH= cd -- "$backup_dir" && pwd)
case "$backup_dir" in "$TOPLINK_BACKUP_DIR"/*) ;; *) die "Backup escaped TOPLINK_BACKUP_DIR" ;; esac

(
  cd "$backup_dir"
  sha256sum -c SHA256SUMS
)

restore_db=toplink_restore_$(date -u +%Y%m%d%H%M%S)
tmp_dir=$(mktemp -d "${TMPDIR:-/tmp}/toplink-restore.XXXXXX")
cleanup() {
  compose exec -T -e RESTORE_DB="$restore_db" db sh -ceu \
    'mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" -e "DROP DATABASE IF EXISTS \`$RESTORE_DB\`;"' >/dev/null 2>&1 || true
  case "$tmp_dir" in "${TMPDIR:-/tmp}"/toplink-restore.*) rm -rf -- "$tmp_dir" ;; esac
}
trap cleanup EXIT INT TERM

compose exec -T -e RESTORE_DB="$restore_db" db sh -ceu \
  'mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" -e "CREATE DATABASE \`$RESTORE_DB\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"'
gzip -dc "$backup_dir/database.sql.gz" | compose exec -T -e RESTORE_DB="$restore_db" db sh -ceu \
  'exec mariadb -uroot -p"$MARIADB_ROOT_PASSWORD" "$RESTORE_DB"'
table_count=$(compose exec -T -e RESTORE_DB="$restore_db" db sh -ceu \
  'mariadb -N -uroot -p"$MARIADB_ROOT_PASSWORD" "$RESTORE_DB" -e "SHOW TABLES;" | wc -l')
[ "${table_count:-0}" -gt 0 ] || die "Restored database contains no tables"

tar -xzf "$backup_dir/uploads.tar.gz" -C "$tmp_dir"
[ -d "$tmp_dir/wp-content/uploads" ] || die "Uploads archive did not restore the expected directory"
printf 'Restore drill passed in isolated database %s; live production data was not overwritten.\n' "$restore_db"
