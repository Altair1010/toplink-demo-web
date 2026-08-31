# Toplink P5 local WordPress

This directory is the repository-owned, localhost-only CMS foundation for P5. It does not connect to `web/`.

## Start or resume

From PowerShell:

```powershell
./scripts/bootstrap.ps1
```

The first run generates an untracked `.env`, starts the persistent Compose project, installs WordPress only when absent, activates `toplink-content-model`, creates the local roles/users/categories and seeds unmistakably nonproduction drafts. Re-running is idempotent.

Default endpoint: `http://127.0.0.1:8085`. Change `TOPLINK_WP_PORT` in the local `.env` if needed. The database is not published to the host.

## Operations

```powershell
./scripts/wp.ps1 core version
./scripts/verify-p5.ps1
docker compose stop
docker compose down
```

Do not add `-v` to `down`: the named volumes contain local editorial data. Credentials, core runtime, uploads, database files and logs are intentionally untracked.
