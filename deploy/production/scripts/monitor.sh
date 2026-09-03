#!/usr/bin/env bash
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
# shellcheck source=common.sh
. "$SCRIPT_DIR/common.sh"

require_command curl
require_command docker
require_command openssl
assert_production_env

# Container/process crash visibility.
running=$(compose ps --status running --services)
for service in caddy web wordpress db; do
  printf '%s\n' "$running" | grep -Fxq "$service" || die "Required service is not running: $service"
done

# Disk pressure visibility for both Docker state and backup storage.
disk_used=$(df -P "$TOPLINK_BACKUP_DIR" | awk 'NR==2 {gsub(/%/, "", $5); print $5}')
[ -n "$disk_used" ] && [ "$disk_used" -lt 85 ] || die "Backup filesystem disk use is at or above 85 percent"

# Backup failure/staleness visibility.
latest_backup=$(find "$TOPLINK_BACKUP_DIR" -mindepth 1 -maxdepth 1 -type d -name '20*T*Z' | sort | tail -n 1)
[ -n "$latest_backup" ] || die "No production backup exists"
backup_age=$(( $(date +%s) - $(stat -c %Y "$latest_backup") ))
[ "$backup_age" -lt 129600 ] || die "Latest production backup is older than 36 hours"
[ -f "$latest_backup/SHA256SUMS" ] || die "Latest backup has no checksum manifest"

# Frontend, CMS and certificate expiry visibility.
curl --fail --silent --show-error --max-time 15 --output /dev/null "$TOPLINK_PUBLIC_SITE_URL/"
curl --fail --silent --show-error --max-time 15 --output /dev/null "$TOPLINK_CMS_BASE_URL/schema"
printf '' | openssl s_client -connect "$TOPLINK_PUBLIC_HOST:443" -servername "$TOPLINK_PUBLIC_HOST" 2>/dev/null \
  | openssl x509 -checkend 604800 -noout >/dev/null || die "Frontend certificate expires within seven days or is unavailable"
printf '' | openssl s_client -connect "$TOPLINK_CMS_HOST:443" -servername "$TOPLINK_CMS_HOST" 2>/dev/null \
  | openssl x509 -checkend 604800 -noout >/dev/null || die "CMS certificate expires within seven days or is unavailable"

printf 'Toplink service, disk, backup and certificate checks passed.\n'
