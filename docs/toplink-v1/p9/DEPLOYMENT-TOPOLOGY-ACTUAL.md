# P9 Deployment Topology — Actual State

**Actual hosted topology:** not provisioned.  
**Prepared topology:** single-VPS Docker Compose contract under `deploy/production/`.  
**Current status:** `BLOCKED_INFRA_INPUT`.

```text
Internet :80/:443
        |
      Caddy
       / \
 Next.js  WordPress
              |
        internal network
              |
           MariaDB
```

Only Caddy publishes host ports. Next.js and WordPress are reachable by service name on the Compose edge network; MariaDB belongs only to the `internal: true` backend network. Named volumes preserve MariaDB, WordPress/uploads, Next cache, and Caddy certificate/config state. Every long-running service uses `restart: unless-stopped`.

This is configuration evidence, not runtime evidence. No provider/server, Linux OS, public IP, firewall, disk mount, container volume, Caddy certificate or service has been observed on a target host.

The design follows current official guidance: Next.js recommends a reverse proxy for self-hosting and supports standalone Docker output; Docker Compose named volumes are persistent data stores; Caddy automates public HTTPS only after DNS and ports 80/443 reach the host.

Sources: https://nextjs.org/docs/app/guides/self-hosting · https://nextjs.org/docs/app/api-reference/config/next-config-js/output · https://docs.docker.com/reference/compose-file/volumes/ · https://caddyserver.com/docs/automatic-https
