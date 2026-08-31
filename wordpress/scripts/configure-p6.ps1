[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$wordpressRoot = Split-Path -Parent $PSScriptRoot
$repositoryRoot = Split-Path -Parent $wordpressRoot
$wordpressEnvPath = Join-Path $wordpressRoot '.env'
$webEnvPath = Join-Path (Join-Path $repositoryRoot 'web') '.env.local'

function New-P6Secret {
    $bytes = [byte[]]::new(32)
    $generator = [Security.Cryptography.RandomNumberGenerator]::Create()
    try { $generator.GetBytes($bytes) }
    finally { $generator.Dispose() }
    return [Convert]::ToBase64String($bytes).TrimEnd('=').Replace('+', '-').Replace('/', '_')
}

function Read-DotEnvLines([string]$Path) {
    if (Test-Path -LiteralPath $Path) {
        return ,([Collections.Generic.List[string]]::new([string[]][IO.File]::ReadAllLines($Path)))
    }
    return ,([Collections.Generic.List[string]]::new())
}

function Get-DotEnvValue([Collections.Generic.List[string]]$Lines, [string]$Name) {
    foreach ($line in $Lines) {
        if ($line -match "^$([Regex]::Escape($Name))=(.*)$") { return $Matches[1] }
    }
    return $null
}

function Set-DotEnvValue([Collections.Generic.List[string]]$Lines, [string]$Name, [string]$Value) {
    for ($index = 0; $index -lt $Lines.Count; $index++) {
        if ($Lines[$index] -match "^$([Regex]::Escape($Name))=") {
            $Lines[$index] = "$Name=$Value"
            return
        }
    }
    $Lines.Add("$Name=$Value")
}

if (-not (Test-Path -LiteralPath $wordpressEnvPath)) {
    throw 'Run wordpress/scripts/bootstrap.ps1 before configure-p6.ps1.'
}

$wordpressLines = Read-DotEnvLines $wordpressEnvPath
$webhookSecret = Get-DotEnvValue $wordpressLines 'TOPLINK_WEBHOOK_SECRET'
$previewSecret = Get-DotEnvValue $wordpressLines 'TOPLINK_PREVIEW_SECRET'
if (-not $webhookSecret) { $webhookSecret = New-P6Secret }
if (-not $previewSecret) { $previewSecret = New-P6Secret }

Set-DotEnvValue $wordpressLines 'TOPLINK_WEBHOOK_URL' 'http://host.docker.internal:3000/api/cms/revalidate'
Set-DotEnvValue $wordpressLines 'TOPLINK_WEBHOOK_SECRET' $webhookSecret
Set-DotEnvValue $wordpressLines 'TOPLINK_PREVIEW_SECRET' $previewSecret
Set-DotEnvValue $wordpressLines 'TOPLINK_PREVIEW_WEB_URL' 'http://127.0.0.1:3000/api/cms/preview'
[IO.File]::WriteAllLines($wordpressEnvPath, $wordpressLines, [Text.UTF8Encoding]::new($false))

$webLines = Read-DotEnvLines $webEnvPath
Set-DotEnvValue $webLines 'TOPLINK_CMS_BASE_URL' 'http://127.0.0.1:8085/wp-json/toplink/v1'
Set-DotEnvValue $webLines 'TOPLINK_WEBHOOK_SECRET' $webhookSecret
Set-DotEnvValue $webLines 'TOPLINK_PREVIEW_SECRET' $previewSecret
[IO.File]::WriteAllLines($webEnvPath, $webLines, [Text.UTF8Encoding]::new($false))

Write-Output 'P6 local integration environment is configured; secret values were not printed.'
