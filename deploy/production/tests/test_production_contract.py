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
        self.assertEqual(len(third_party), 3)
        self.assertTrue(all("@sha256:" in image for image in third_party), images)
        self.assertIn("image: toplink-web:${TOPLINK_DEPLOY_SHA:?Set TOPLINK_DEPLOY_SHA}", compose)
        for volume in ("toplink_db_data", "toplink_wordpress_data", "toplink_next_cache", "toplink_caddy_data"):
            self.assertIn(volume, compose)
        self.assertGreaterEqual(compose.count("restart: unless-stopped"), 4)

    def test_public_contract_defaults_fail_closed(self) -> None:
        compose = (DEPLOY / "compose.yaml").read_text(encoding="utf-8")
        env = (DEPLOY / "env.example").read_text(encoding="utf-8")
        self.assertIn('TOPLINK_INDEXING_ENABLED: "0"', compose)
        self.assertNotRegex(env, r"(?im)^(TOPLINK_CONTACT|TOPLINK_PHONE|TOPLINK_ZALO|TOPLINK_FACEBOOK)")
        self.assertNotRegex(env, r"(?i)(__P[5-9]_|lorem ipsum|href=#)")
        self.assertNotIn("localhost", env.lower())
        self.assertNotIn("127.0.0.1", env)

    def test_next_standalone_runtime_is_enabled(self) -> None:
        config = (ROOT / "web" / "next.config.mjs").read_text(encoding="utf-8")
        self.assertIn('output: "standalone"', config)


if __name__ == "__main__":
    unittest.main()
