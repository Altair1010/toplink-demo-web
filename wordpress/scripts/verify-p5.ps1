[CmdletBinding()]
param(
    [switch]$AllowP6Integration
)

$ErrorActionPreference = 'Stop'
$wordpressRoot = Split-Path -Parent $PSScriptRoot
$repoRoot = Split-Path -Parent $wordpressRoot

Push-Location $repoRoot
try {
    & python -m unittest discover -s wordpress/tests/contract -v
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
finally {
    Pop-Location
}

Push-Location $wordpressRoot
try {
    & docker compose config --quiet
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    $dbId = (& docker compose ps -q db).Trim()
    $wpId = (& docker compose ps -q wordpress).Trim()
    $dbHealth = (& docker inspect --format '{{.State.Health.Status}}' $dbId).Trim()
    $wpHealth = (& docker inspect --format '{{.State.Health.Status}}' $wpId).Trim()
    if ($dbHealth -ne 'healthy' -or $wpHealth -ne 'healthy') { throw "Unhealthy containers: db=$dbHealth wordpress=$wpHealth" }
    & docker compose run --rm wpcli core is-installed
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    & docker compose run --rm wpcli plugin is-active toplink-content-model
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    $phpFiles = Get-ChildItem -LiteralPath (Join-Path $wordpressRoot 'plugins/toplink-content-model') -Recurse -Filter '*.php'
    foreach ($phpFile in $phpFiles) {
        $containerPath = '/var/www/html/wp-content/plugins/toplink-content-model/' + $phpFile.FullName.Substring((Join-Path $wordpressRoot 'plugins/toplink-content-model').Length + 1).Replace('\', '/')
        & docker compose run --rm --entrypoint php wpcli -l $containerPath
        if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    }
    & docker compose run --rm wpcli eval-file /opt/toplink-tests/runtime/verify-p5.php
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

    $envValues = @{}
    Get-Content -LiteralPath (Join-Path $wordpressRoot '.env') | ForEach-Object {
        if ($_ -match '^[^#][^=]*=') { $name, $value = $_ -split '=', 2; $envValues[$name] = $value }
    }
    Push-Location $repoRoot
    try {
        foreach ($name in @('TOPLINK_DB_PASSWORD', 'TOPLINK_DB_ROOT_PASSWORD', 'TOPLINK_WP_ADMIN_PASSWORD', 'TOPLINK_WP_AUTHOR_PASSWORD', 'TOPLINK_WP_EDITOR_PASSWORD')) {
            $match = & git grep -F -l -- $envValues[$name] -- . 2>$null
            if ($match) { throw "Tracked secret value detected for $name" }
        }
        $trackedEnv = & git ls-files -- wordpress/.env
        if ($trackedEnv) { throw 'wordpress/.env is tracked.' }
        if (-not $AllowP6Integration) {
            $cmsTrace = & rg -n -i 'WORDPRESS_URL|CMS_URL|wp-json|toplink/v1|wp-client' web 2>$null
            if ($cmsTrace) { throw 'P6/CMS integration trace detected in web/.' }
        }
        $base = '74ca8f120fa6a1630d9bca16191291bd6a366afa'
        $webDiff = & git diff --name-only $base -- web
        $appDiff = & git diff --name-only $base -- app-demo
        $deletions = & git diff --diff-filter=D --name-only $base
        if ($webDiff -and -not $AllowP6Integration) { throw 'web/ changed during P5.' }
        if ($appDiff) { throw 'app-demo/ changed during P5.' }
        if ($deletions) { throw 'An existing tracked file was deleted.' }
    }
    finally {
        Pop-Location
    }
}
finally {
    Pop-Location
}
