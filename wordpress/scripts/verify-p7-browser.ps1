[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$wordpressRoot = Split-Path -Parent $PSScriptRoot
$repoRoot = Split-Path -Parent $wordpressRoot
$webRoot = Join-Path $repoRoot 'web'
$stateScript = '/opt/toplink-tests/runtime/p7-contact-state.php'
$port = 4197

function Invoke-P7ContactState {
    param(
        [Parameter(Mandatory = $true)][string]$Mode,
        [string]$Snapshot = ''
    )
    Push-Location $wordpressRoot
    try {
        $arguments = @('compose', 'run', '--rm', '-T', '-e', "P7_CONTACT_MODE=$Mode")
        if ($Snapshot) { $arguments += @('-e', "P7_CONTACT_SNAPSHOT=$Snapshot") }
        $arguments += @('wpcli', 'eval-file', $stateScript)
        $output = & docker @arguments
        if ($LASTEXITCODE -ne 0) { throw "P7 contact state command failed for mode $Mode." }
        return ($output -join "`n")
    }
    finally {
        Pop-Location
    }
}

$inspection = Invoke-P7ContactState -Mode 'inspect'
if ($inspection -notmatch 'P7_CONTACT_STATE=SAFE') { throw 'P7 contact precondition was not confirmed.' }
$snapshotOutput = Invoke-P7ContactState -Mode 'snapshot'
if ($snapshotOutput -notmatch 'P7_SNAPSHOT=([A-Za-z0-9+/=]+)') { throw 'P7 contact snapshot was not captured.' }
$snapshot = $Matches[1]
$previewOutput = Invoke-P7ContactState -Mode 'preview-id'
if ($previewOutput -notmatch 'P7_PREVIEW_ID=(\d+)') { throw 'P7 preview record id was not found.' }
$previewId = $Matches[1]

try {
    $stateOutput = Invoke-P7ContactState -Mode 'pending'
    if ($stateOutput -notmatch 'P7_CONTACT_STATE=PENDING') { throw 'P7 pending state was not applied.' }
    Push-Location $webRoot
    try {
        $previousPublicSite = $env:TOPLINK_PUBLIC_SITE_URL
        $previousIndexing = $env:TOPLINK_INDEXING_ENABLED
        $previousWebBase = $env:TOPLINK_WEB_BASE_URL
        $previousMode = $env:P7_BROWSER_MODE
        $previousPort = $env:P7_PORT
        $previousPreviewId = $env:P7_PREVIEW_ID
        try {
            $env:TOPLINK_PUBLIC_SITE_URL = "http://127.0.0.1:$port/"
            $env:TOPLINK_INDEXING_ENABLED = '0'
            $env:TOPLINK_WEB_BASE_URL = "http://127.0.0.1:$port/"
            & npm run build
            if ($LASTEXITCODE -ne 0) { throw 'P7 browser build failed.' }
            foreach ($mode in @('pending', 'approved', 'invalid')) {
                $env:P7_BROWSER_MODE = $mode
                $env:P7_PORT = [string]$port
                $env:P7_PREVIEW_ID = $previewId
                & node scripts/verify-p7-browser.mjs
                if ($LASTEXITCODE -ne 0) { throw "P7 browser mode $mode failed." }
            }
        }
        finally {
            $env:TOPLINK_PUBLIC_SITE_URL = $previousPublicSite
            $env:TOPLINK_INDEXING_ENABLED = $previousIndexing
            $env:TOPLINK_WEB_BASE_URL = $previousWebBase
            $env:P7_BROWSER_MODE = $previousMode
            $env:P7_PORT = $previousPort
            $env:P7_PREVIEW_ID = $previousPreviewId
        }
    }
    finally {
        Pop-Location
    }
}
finally {
    $restoreOutput = Invoke-P7ContactState -Mode 'restore' -Snapshot $snapshot
    if ($restoreOutput -notmatch 'P7_CONTACT_STATE=RESTORED') { throw 'P7 contact state was not restored.' }
}

Write-Output 'P7 browser contact states passed and the exact prior SiteSettings state was restored.'
