# P9 Backup and Restore Report

**Production backup:** NOT EXECUTED.  
**Restore drill:** NOT EXECUTED.  
**Backup artifacts/hashes:** none.

Prepared controls exist under `deploy/production/`:

- `scripts/backup.sh` creates a transaction-consistent MariaDB dump, uploads archive, deploy SHA, image-lock list and `SHA256SUMS` in a timestamped mode-restricted directory.
- Retention is explicit through `TOPLINK_BACKUP_RETENTION_DAYS`; deletion is bounded to timestamp-named children below the validated absolute backup root.
- `scripts/restore-drill.sh` verifies hashes, restores into a uniquely named temporary database, confirms tables exist, extracts uploads in an isolated temporary directory, then drops only the temporary database.
- `systemd/toplink-backup.timer` schedules a persistent daily 03:15 backup for a standard `/srv/toplink` deployment.

Static contract tests and GNU Bash syntax checks passed locally. The scripts did not connect to a production DB or volume, no systemd unit was installed, no off-host backup destination was selected, and no restore timestamp/result can truthfully be recorded yet.

Before `PUBLIC_ONLINE`, install/enable the timer, configure a protected backup location (preferably copied off-host), run one backup, record hashes without contents, and run the isolated restore drill.
