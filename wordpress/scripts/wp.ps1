[CmdletBinding()]
param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$WpArguments
)

$ErrorActionPreference = 'Stop'
$wordpressRoot = Split-Path -Parent $PSScriptRoot
Push-Location $wordpressRoot
try {
    & docker compose run --rm wpcli @WpArguments
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
finally {
    Pop-Location
}
