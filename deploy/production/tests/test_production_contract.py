from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[3]
DEPLOY = ROOT / "deploy" / "production"


class ProductionContractTest(unittest.TestCase):
    def test_required_deployment_files_exist(self) -> None:
        for relative in (
            "Dockerfile.web",
            "Dockerfile.web.dockerignore",
            "compose.yaml",
            "Caddyfile",
            "env.example",
        ):
            self.assertTrue((DEPLOY / relative).is_file(), relative)

    def test_web_build_context_excludes_local_state_and_secrets(self) -> None:
        ignore = (DEPLOY / "Dockerfile.web.dockerignore").read_text(encoding="utf-8")
        for pattern in ("web/.env*", "web/node_modules", "web/.next", ".git"):
            self.assertIn(pattern, ignore)

    def test_compose_has_one_ingress_and_private_application_services(self) -> None:
        compose = (DEPLOY / "compose.yaml").read_text(encoding="utf-8")
        for service in ("caddy", "web", "wordpress", "db"):
            self.assertRegex(compose, rf"(?m)^  {service}:$")
        self.assertEqual(compose.count("ports:"), 1)
        self.assertIn('      - "80:80"', compose)
        self.assertIn('      - "443:443"', compose)
        self.assertRegex(compose, r"(?ms)^  backend:\n    internal: true$")
        self.assertIn("TOPLINK_ACME_EMAIL: ${TOPLINK_ACME_EMAIL:?Set TOPLINK_ACME_EMAIL}", compose)

    def test_images_are_immutable_and_state_is_persistent(self) -> None:
        compose = (DEPLOY / "compose.yaml").read_text(encoding="utf-8")
        images = re.findall(r"(?m)^    image: (.+)$", compose)
        third_party = [image for image in images if not image.startswith("toplink-web:")]
        self.assertEqual(len(third_party), 4)
        self.assertTrue(all("@sha256:" in image for image in third_party), images)
        self.assertIn("image: toplink-web:${TOPLINK_DEPLOY_SHA:?Set TOPLINK_DEPLOY_SHA}", compose)
        for volume in ("toplink_db_data", "toplink_wordpress_data", "toplink_next_cache", "toplink_caddy_data"):
            self.assertIn(volume, compose)
        self.assertGreaterEqual(compose.count("restart: unless-stopped"), 4)

    def test_public_contract_defaults_fail_closed(self) -> None:
        compose = (DEPLOY / "compose.yaml").read_text(encoding="utf-8")
        env = (DEPLOY / "env.example").read_text(encoding="utf-8")
        caddy = (DEPLOY / "Caddyfile").read_text(encoding="utf-8")
        self.assertIn('TOPLINK_INDEXING_ENABLED: "0"', compose)
        self.assertNotRegex(env, r"(?im)^(TOPLINK_CONTACT|TOPLINK_PHONE|TOPLINK_ZALO|TOPLINK_FACEBOOK)")
        self.assertNotRegex(env, r"(?i)(__P[5-9]_|lorem ipsum|href=#)")
        self.assertNotIn("localhost", env.lower())
        self.assertNotIn("127.0.0.1", env)
        self.assertEqual(caddy.count("replace intent REDACTED"), 1)
        self.assertEqual(caddy.count("import redacted-access-log"), 2)

    def test_next_standalone_runtime_is_enabled(self) -> None:
        config = (ROOT / "web" / "next.config.mjs").read_text(encoding="utf-8")
        self.assertIn('output: "standalone"', config)

    def test_operations_scripts_are_present_and_fail_closed(self) -> None:
        scripts = DEPLOY / "scripts"
        required = (
            "common.sh",
            "bootstrap.sh",
            "deploy.sh",
            "backup.sh",
            "restore-drill.sh",
            "verify-public.sh",
            "monitor.sh",
        )
        for name in required:
            path = scripts / name
            self.assertTrue(path.is_file(), name)
            text = path.read_text(encoding="utf-8")
            self.assertIn("set -euo pipefail", text, name)
            self.assertNotIn("set -x", text, name)

        common = (scripts / "common.sh").read_text(encoding="utf-8")
        self.assertIn("assert_production_env", common)
        self.assertIn("TOPLINK_INDEXING_ENABLED", common)
        self.assertIn("REPLACE_ON_SERVER", common)

        bootstrap = (scripts / "bootstrap.sh").read_text(encoding="utf-8")
        self.assertIn('repository_sha=$(git -C "$REPO_DIR" rev-parse HEAD) || die', bootstrap)
        self.assertLess(bootstrap.index("repository_sha=$(git"), bootstrap.index('cp "$DEPLOY_DIR/env.example"'))

    def test_backup_and_restore_are_bounded(self) -> None:
        backup = (DEPLOY / "scripts" / "backup.sh").read_text(encoding="utf-8")
        restore = (DEPLOY / "scripts" / "restore-drill.sh").read_text(encoding="utf-8")
        self.assertIn("mariadb-dump", backup)
        self.assertIn("wp-content/uploads", backup)
        self.assertIn("sha256sum", backup)
        self.assertIn("TOPLINK_BACKUP_RETENTION_DAYS", backup)
        self.assertIn("toplink_restore_", restore)
        self.assertIn("DROP DATABASE", restore)
        self.assertNotRegex(restore, r"rm\s+-rf\s+[\"']?/(?:[\"']|\s|$)")

    def test_public_verifier_covers_release_gates(self) -> None:
        verifier = (DEPLOY / "scripts" / "verify-public.sh").read_text(encoding="utf-8")
        for route in ("/", "/gioi-thieu", "/dich-vu", "/san-pham", "/kien-thuc", "/tin-tuc"):
            self.assertIn(route, verifier)
        for marker in ("__P5_", "__P6_", "__P7_", "__P8_", "__P9_", "Lorem ipsum"):
            self.assertIn(marker, verifier)
        for header in ("X-Content-Type-Options", "Referrer-Policy", "X-Frame-Options", "Permissions-Policy"):
            self.assertIn(header, verifier)

    def test_backup_and_monitoring_are_scheduled(self) -> None:
        systemd = DEPLOY / "systemd"
        backup_service = (systemd / "toplink-backup.service").read_text(encoding="utf-8")
        backup_timer = (systemd / "toplink-backup.timer").read_text(encoding="utf-8")
        monitor_service = (systemd / "toplink-monitor.service").read_text(encoding="utf-8")
        monitor_timer = (systemd / "toplink-monitor.timer").read_text(encoding="utf-8")
        self.assertIn("/srv/toplink/deploy/production/scripts/backup.sh", backup_service)
        self.assertIn("OnCalendar=*-*-* 03:15:00", backup_timer)
        self.assertIn("Persistent=true", backup_timer)
        self.assertIn("/srv/toplink/deploy/production/scripts/monitor.sh", monitor_service)
        self.assertIn("OnUnitActiveSec=5min", monitor_timer)
        monitor = (DEPLOY / "scripts" / "monitor.sh").read_text(encoding="utf-8")
        for marker in ("disk", "backup", "openssl s_client", "compose ps", "TOPLINK_CMS_BASE_URL"):
            self.assertIn(marker, monitor)

    def test_p9_evidence_documents_report_the_actual_blocked_state(self) -> None:
        evidence = ROOT / "docs" / "toplink-v1" / "p9"
        required = (
            "DEPLOYMENT-TOPOLOGY-ACTUAL.md",
            "HOST-INVENTORY.md",
            "ENV-CONTRACT.md",
            "PUBLIC-URL.md",
            "WORDPRESS-PRODUCTION-STATE.md",
            "BACKUP-RESTORE-REPORT.md",
            "OUTAGE-RECOVERY-REPORT.md",
            "POST-DEPLOY-TEST-REPORT.md",
            "ROLLBACK.md",
            "DEFERRED-INPUTS.md",
            "OPEN-FINDINGS.md",
        )
        for name in required:
            path = evidence / name
            self.assertTrue(path.is_file(), name)
            self.assertGreater(len(path.read_text(encoding="utf-8")), 200, name)

        public_state = (evidence / "PUBLIC-URL.md").read_text(encoding="utf-8")
        self.assertIn("P9 public frontend: NOT AVAILABLE", public_state)
        self.assertIn("BLOCKED_INFRA_INPUT", public_state)
        workstate = (ROOT / "docs" / "toplink-v1" / "WORKSTATE.md").read_text(encoding="utf-8")
        self.assertIn("**Phase:** P9", workstate)
        self.assertIn("**Status:** BLOCKED_INFRA_INPUT", workstate)


if __name__ == "__main__":
    unittest.main()
