# Backup and Restore Readiness

A non-destructive MariaDB export produced ignored local artifact `.toplink-tools/p8/toplink-local-db.sql` (1,602,740 bytes). Header/footer validation passed; SHA-256 is `577d1f7c0536c1e434712da3cafd7e307a38ac8569106bc2750aa18ed900f1ce`. It is not committed. Production scheduling, encrypted storage and a restore drill require the P9 hosting topology. Uploads and plugin/config source must be included with the database in that plan.
