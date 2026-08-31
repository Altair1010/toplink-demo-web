[CmdletBinding()]
param(
    [switch]$Http,
    [switch]$Browser
)

$ErrorActionPreference = 'Stop'
$wordpressRoot = Split-Path -Parent $PSScriptRoot
$repoRoot = Split-Path -Parent $wordpressRoot
$webRoot = Join-Path $repoRoot 'web'
$p5Base = '71361d18ead8b84fdafeb17e8fc28856d2fa3d50'

& (Join-Path $PSScriptRoot 'verify-p5.ps1') -AllowP6Integration
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Push-Location $wordpressRoot
try {
    & docker compose --env-file .env run --rm wpcli eval-file /opt/toplink-tests/runtime/verify-p6.php
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
finally {
    Pop-Location
}

Push-Location $webRoot
try {
    foreach ($command in @('test:p6', 'typecheck', 'format:check', 'check:content', 'build')) {
        & npm run $command
        if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    }
    if ($Http) {
        & npm run test:p6:http
        if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    }
    if ($Browser) {
        $previousP6Cms = $env:P6_CMS
        try {
            $env:P6_CMS = '1'
            & npm run browser:audit
            if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
        }
        finally {
            $env:P6_CMS = $previousP6Cms
        }
    }
}
finally {
    Pop-Location
}

$wpEnv = @{}
Get-Content -LiteralPath (Join-Path $wordpressRoot '.env') | ForEach-Object {
    if ($_ -match '^([^#][^=]*)=(.*)$') { $wpEnv[$Matches[1]] = $Matches[2] }
}
$webEnv = @{}
Get-Content -LiteralPath (Join-Path $webRoot '.env.local') | ForEach-Object {
    if ($_ -match '^([^#][^=]*)=(.*)$') { $webEnv[$Matches[1]] = $Matches[2] }
}

Push-Location $repoRoot
try {
    $secretNames = @(
        'TOPLINK_WEBHOOK_SECRET',
        'TOPLINK_PREVIEW_SECRET',
        'TOPLINK_DB_PASSWORD',
        'TOPLINK_DB_ROOT_PASSWORD',
        'TOPLINK_WP_ADMIN_PASSWORD',
        'TOPLINK_WP_AUTHOR_PASSWORD',
        'TOPLINK_WP_EDITOR_PASSWORD'
    )
    foreach ($name in $secretNames) {
        $value = if ($webEnv[$name]) { $webEnv[$name] } else { $wpEnv[$name] }
        if (-not $value) { continue }
        if (& git grep -F -l -- $value -- . 2>$null) { throw "Tracked secret value detected for $name." }
        if (& rg -F -l --hidden -g '!**/.git/**' -g '!web/node_modules/**' -g '!web/.next/**' -g '!wordpress/.env' -g '!web/.env.local' -- $value web wordpress docs 2>$null) {
            throw "Source secret value detected for $name."
        }
        if (& rg -F -l --hidden -- $value web/.next 2>$null) { throw "Built bundle secret value detected for $name." }
    }
    if (& git ls-files -- wordpress/.env web/.env.local) { throw 'A local environment file is tracked.' }
    if (& rg -n 'NEXT_PUBLIC_[A-Z0-9_]*(SECRET|PASSWORD|CREDENTIAL)\s*=' web wordpress 2>$null) { throw 'Public secret-like environment assignment detected.' }
    if (& git diff --name-only $p5Base -- app-demo) { throw 'app-demo changed during P6.' }
    if (& git diff --diff-filter=D --name-only $p5Base) { throw 'An existing tracked file was deleted during P6.' }
    if (-not (Test-Path -LiteralPath (Join-Path $webRoot 'lib/fixtures/data.ts'))) { throw 'P4 fixtures are missing.' }
    & git diff --check
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
finally {
    Pop-Location
}

Write-Output 'P6 verification passed; secrets, fixtures, app-demo and deletion boundaries are clean.'
