# P5 Docker Image Lock

Resolved on 2026-08-31 from Docker Official Images and inspected after a successful local pull on `linux/amd64`.

| Purpose | Human-readable tag used for resolution | Immutable Compose reference |
| --- | --- | --- |
| WordPress + Apache + PHP 8.3 | `wordpress:7.1.0-php8.3-apache` | `wordpress@sha256:5a93c470ae8220fddf71f6ebe3bc94e615ddc2ae4d9810f795b830fb11c41a17` |
| WP-CLI 2.12 + PHP 8.3 | `wordpress:cli-2.12.0-php8.3` | `wordpress@sha256:2b5e9d4d3e51909dca1aaa4732e9f5e5bf0377c2114dbd8ff39f060bff202586` |
| MariaDB 11.8 LTS | `mariadb:11.8.9` | `mariadb@sha256:2439dcd7d14010ecd1ff7a4e1c5abe8e208c34fe35290744deeeaac3569043c3` |

The tag documents the reviewed release. Compose uses only the digest. Updating a digest requires a deliberate pull, inspection, runtime verification and review of this file.
