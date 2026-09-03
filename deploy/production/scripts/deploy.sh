#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
# shellcheck source=common.sh
. "$SCRIPT_DIR/common.sh"

require_command git
require_command docker
assert_production_env

current_sha=$(git -C "$REPO_DIR" rev-parse HEAD)
[ "$current_sha" = "$TOPLINK_DEPLOY_SHA" ] || die "Checked-out SHA does not match TOPLINK_DEPLOY_SHA"
[ -z "$(git -C "$REPO_DIR" status --porcelain)" ] || die "Production checkout must be clean"

compose build --pull web
"$SCRIPT_DIR/bootstrap.sh"
compose up -d --remove-orphans
compose ps
printf 'Deployment started at exact SHA %s. Run verify-public.sh only after public DNS and certificates are ready.\n' "$TOPLINK_DEPLOY_SHA"
