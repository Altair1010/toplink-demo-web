#!/usr/bin/env bash
set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
# shellcheck source=common.sh
. "$SCRIPT_DIR/common.sh"

require_command curl
assert_production_env

tmp_dir=$(mktemp -d "${TMPDIR:-/tmp}/toplink-public-verify.XXXXXX")
cleanup() {
  case "$tmp_dir" in "${TMPDIR:-/tmp}"/toplink-public-verify.*) rm -rf -- "$tmp_dir" ;; esac
}
trap cleanup EXIT INT TERM

routes='/ /gioi-thieu /dich-vu /san-pham /kien-thuc /tin-tuc'
for route in $routes; do
  name=$(printf '%s' "$route" | tr '/-' '__')
  [ -n "$name" ] || name=root
  code=$(curl --fail-with-body --silent --show-error --location \
    --output "$tmp_dir/$name.html" --write-out '%{http_code}' "$TOPLINK_PUBLIC_SITE_URL$route")
  [ "$code" = "200" ] || die "Public route failed: $route ($code)"
done

curl --fail --silent --show-error --dump-header "$tmp_dir/headers.txt" \
  --output /dev/null "$TOPLINK_PUBLIC_SITE_URL/"
for header in X-Content-Type-Options Referrer-Policy X-Frame-Options Permissions-Policy; do
  grep -Eiq "^${header}:" "$tmp_dir/headers.txt" || die "Missing public security header: $header"
done

for marker in __P5_ __P6_ __P7_ __P8_ __P9_ fixture mock 'Lorem ipsum' TBD; do
  if grep -RFiq -- "$marker" "$tmp_dir"; then
    die "Production-facing test marker detected: $marker"
  fi
done

robots=$(curl --fail --silent --show-error "$TOPLINK_PUBLIC_SITE_URL/robots.txt")
printf '%s' "$robots" | grep -Eiq 'Disallow:[[:space:]]*/' || die "robots.txt does not keep indexing disabled"

schema=$(curl --fail --silent --show-error "$TOPLINK_CMS_BASE_URL/schema")
for domain in Service Product Article Media SiteSettings; do
  printf '%s' "$schema" | grep -Fq "\"$domain\"" || die "CMS schema is missing domain: $domain"
done
curl --fail --silent --show-error --output /dev/null "$TOPLINK_CMS_BASE_URL/site-settings"
curl --fail --silent --show-error --output /dev/null "https://$TOPLINK_CMS_HOST/wp-admin/"

printf 'Anonymous HTTPS routes, noindex policy, security headers and five-domain CMS checks passed.\n'
