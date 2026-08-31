# P5 Seed Manifest

`wordpress/scripts/seed.php` is idempotent and creates only these persistent local seeds when absent:

| Type | Slug/key | Default state | Purpose |
| --- | --- | --- | --- |
| Service | `p5-fixture-dich-vu` | WP draft, lifecycle draft, all manual facts `REFERENCE_ONLY` | Exercise Service editor without a real claim. |
| Product | `p5-fixture-san-pham` | WP draft, lifecycle draft, all manual facts `REFERENCE_ONLY` | Exercise informational Product editor. |
| Article | `p5-fixture-bai-viet` | WP draft, `kien-thuc`, lifecycle draft, all manual facts `REFERENCE_ONLY` | Exercise core Article workflow. |
| SiteSettings | `public_display_name` | `APPROVED`, source `DECISIONS.md D-001` | Use the locked public identity only. |
| SiteSettings | all operational/contact slots | empty + `PENDING` | Prove fail-closed omission; no fake destination. |

Every seed title/body visibly says `P5 FIXTURE — KHÔNG PHẢI NỘI DUNG SẢN XUẤT`. No service claim, product use, customer story, person, place, contact, health result or commercial fact is seeded.

The runtime harness also reuses records prefixed `__P5_CONTRACT_TEST__`. Those records are local automated evidence, may temporarily publish on localhost to prove the valid path, are not committed seed truth and are never deleted. The harness changes only its own named records.
