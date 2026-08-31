[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$wordpressRoot = Split-Path -Parent $PSScriptRoot
$envPath = Join-Path $wordpressRoot '.env'

function New-LocalSecret {
    $bytes = [byte[]]::new(32)
    $generator = [Security.Cryptography.RandomNumberGenerator]::Create()
    try { $generator.GetBytes($bytes) }
    finally { $generator.Dispose() }
    return [Convert]::ToBase64String($bytes).TrimEnd('=').Replace('+', '-').Replace('/', '_')
}

function Read-DotEnv([string]$Path) {
    $result = @{}
    foreach ($line in [IO.File]::ReadAllLines($Path)) {
        if ($line -match '^\s*#' -or $line -notmatch '=') { continue }
        $name, $value = $line -split '=', 2
        $result[$name.Trim()] = $value.Trim()
    }
    return $result
}

if (-not (Test-Path -LiteralPath $envPath)) {
    $lines = @(
        'TOPLINK_WP_PORT=8085'
        'TOPLINK_DB_NAME=toplink_p5'
        'TOPLINK_DB_USER=toplink_p5'
        "TOPLINK_DB_PASSWORD=$(New-LocalSecret)"
        "TOPLINK_DB_ROOT_PASSWORD=$(New-LocalSecret)"
        'TOPLINK_WP_ADMIN_USER=toplink_admin'
        "TOPLINK_WP_ADMIN_PASSWORD=$(New-LocalSecret)"
        'TOPLINK_WP_ADMIN_EMAIL=admin@toplink.invalid'
        'TOPLINK_WP_AUTHOR_USER=p5_author'
        "TOPLINK_WP_AUTHOR_PASSWORD=$(New-LocalSecret)"
        'TOPLINK_WP_EDITOR_USER=p5_editor'
        "TOPLINK_WP_EDITOR_PASSWORD=$(New-LocalSecret)"
    )
    [IO.File]::WriteAllLines($envPath, $lines, [Text.UTF8Encoding]::new($false))
    Write-Output 'Generated local untracked wordpress/.env credentials.'
}

$localEnv = Read-DotEnv $envPath
$port = $localEnv['TOPLINK_WP_PORT']
$baseUrl = "http://127.0.0.1:$port"

Push-Location $wordpressRoot
try {
    & docker compose config --quiet
    if ($LASTEXITCODE -ne 0) { throw 'docker compose config failed.' }

    & docker compose up -d db wordpress
    if ($LASTEXITCODE -ne 0) { throw 'docker compose up failed.' }

    $deadline = (Get-Date).AddMinutes(3)
    do {
        $dbId = (& docker compose ps -q db).Trim()
        $wpId = (& docker compose ps -q wordpress).Trim()
        $dbHealth = if ($dbId) { (& docker inspect --format '{{.State.Health.Status}}' $dbId 2>$null).Trim() } else { '' }
        $wpHealth = if ($wpId) { (& docker inspect --format '{{.State.Health.Status}}' $wpId 2>$null).Trim() } else { '' }
        if ($dbHealth -eq 'healthy' -and $wpHealth -eq 'healthy') { break }
        Start-Sleep -Seconds 3
    } while ((Get-Date) -lt $deadline)
    if ($dbHealth -ne 'healthy' -or $wpHealth -ne 'healthy') {
        throw "Containers did not become healthy (db=$dbHealth wordpress=$wpHealth)."
    }

    $previousPreference = $ErrorActionPreference
    $ErrorActionPreference = 'SilentlyContinue'
    & docker compose run --rm wpcli core is-installed *> $null
    $isInstalledExit = $LASTEXITCODE
    $ErrorActionPreference = $previousPreference
    if ($isInstalledExit -ne 0) {
        $installArgs = @(
            'compose', 'run', '--rm', 'wpcli', 'core', 'install'
            "--url=$baseUrl"
            '--title=Toplink P5 Local CMS'
            "--admin_user=$($localEnv['TOPLINK_WP_ADMIN_USER'])"
            "--admin_password=$($localEnv['TOPLINK_WP_ADMIN_PASSWORD'])"
            "--admin_email=$($localEnv['TOPLINK_WP_ADMIN_EMAIL'])"
            '--skip-email'
        )
        & docker @installArgs
        if ($LASTEXITCODE -ne 0) { throw 'WordPress installation failed.' }
    }

    & docker compose run --rm wpcli plugin activate toplink-content-model
    if ($LASTEXITCODE -ne 0) { throw 'Plugin activation failed.' }
    & docker compose run --rm wpcli rewrite structure '/%postname%/' --hard
    if ($LASTEXITCODE -ne 0) { throw 'Permalink configuration failed.' }
    & docker compose run --rm wpcli eval-file /opt/toplink-scripts/bootstrap-content.php
    if ($LASTEXITCODE -ne 0) { throw 'Role/user/category bootstrap failed.' }
    & docker compose run --rm wpcli eval-file /opt/toplink-scripts/seed.php
    if ($LASTEXITCODE -ne 0) { throw 'Nonproduction seed failed.' }

    $response = Invoke-WebRequest -Uri "$baseUrl/wp-json/toplink/v1/schema" -UseBasicParsing -TimeoutSec 20
    if ($response.StatusCode -ne 200) { throw 'Toplink REST schema is not reachable.' }
    Write-Output "Toplink P5 CMS ready at $baseUrl (persistent volumes preserved)."
}
finally {
    Pop-Location
}
