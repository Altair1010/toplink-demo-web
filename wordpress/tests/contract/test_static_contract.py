from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[2]
PLUGIN = ROOT / "plugins" / "toplink-content-model"


class StaticPluginContractTests(unittest.TestCase):
    def test_plugin_has_exactly_five_public_domains(self) -> None:
        schema = (PLUGIN / "src" / "SchemaRegistry.php").read_text(encoding="utf-8")
        match = re.search(r"PUBLIC_DOMAINS\s*=\s*\[(.*?)\];", schema, re.S)
        self.assertIsNotNone(match, "SchemaRegistry must declare PUBLIC_DOMAINS")
        domains = re.findall(r"'([A-Za-z]+)'", match.group(1))
        self.assertEqual(domains, ["Service", "Product", "Article", "Media", "SiteSettings"])

    def test_forbidden_commerce_and_p6_tokens_are_absent(self) -> None:
        forbidden = {
            "sale_price",
            "purchase_url",
            "checkout",
            "inventory-commerce",
            "booking",
            "wpgraphql",
            "revalidateTag",
            "revalidatePath",
        }
        php = "\n".join(path.read_text(encoding="utf-8") for path in PLUGIN.rglob("*.php"))
        lowered = php.lower()
        leaked = sorted(token for token in forbidden if token.lower() in lowered)
        self.assertEqual(leaked, [])

    def test_rest_routes_are_read_only_and_namespaced(self) -> None:
        rest = (PLUGIN / "src" / "RestApi.php").read_text(encoding="utf-8")
        self.assertIn("toplink/v1", rest)
        self.assertIn("WP_REST_Server::READABLE", rest)
        self.assertNotRegex(rest, r"WP_REST_Server::(?:CREATABLE|EDITABLE|DELETABLE)")

    def test_admin_writes_require_nonce_and_capability(self) -> None:
        admin = (PLUGIN / "src" / "AdminUi.php").read_text(encoding="utf-8")
        self.assertIn("wp_verify_nonce", admin)
        self.assertIn("current_user_can", admin)
        self.assertIn("sanitize_", admin)
        self.assertIn("esc_", admin)

    def test_native_models_and_rest_transport_are_registered(self) -> None:
        models = (PLUGIN / "src" / "ContentTypes.php").read_text(encoding="utf-8")
        self.assertIn("register_post_type( 'service'", models)
        self.assertIn("register_post_type( 'product'", models)
        self.assertIn("register_taxonomy( 'service_group'", models)
        self.assertGreaterEqual(len(re.findall(r"'show_in_rest'\s*=>\s*true", models)), 2)


if __name__ == "__main__":
    unittest.main()
