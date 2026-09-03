# P9 WordPress Production State

**Production WordPress:** not provisioned.  
**Production admin:** not created.  
**Production REST:** not reachable.  
**Fresh database proof:** not executed.

The prepared contract uses the P8-qualified WordPress `7.1.0-php8.3-apache` image digest and mounts the approved `toplink-content-model` plugin read-only. The bootstrap is designed for a fresh named volume and does not import the local P5-P8 database.

On first target execution it will install WordPress only if core is absent; create the operator-supplied admin identity without printing its generated password; remove only the two default records created by that same fresh install; activate the existing plugin and permalink rules; and write only `public_display_name = Y Viện Toplink`, sourced from locked decision D-001 and marked `APPROVED`.

Hotline, Zalo, Facebook, address, hours, legal identifiers and all content remain absent. The Compose configuration sets HTTPS admin mode, disables theme/plugin file editing, keeps the database private, and persists `/var/www/html` including uploads.

These are prepared controls only. `/wp-admin`, plugin activation, five-domain REST output, file permissions, salts and credentials require target-side observation before PASS. Official image guidance: https://hub.docker.com/_/wordpress
