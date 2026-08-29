# 02 — H7 Release Surface Audit

## Public content routes

- `/`;
- `/gioi-thieu`;
- `/dich-vu`;
- `/quy-trinh-tri-lieu`;
- `/tin-tuc`;
- `/lien-he`.

Generated support routes are `/_not-found`, `/icon.svg`, `/opengraph-image`, `/robots.txt` and
`/sitemap.xml`. The export contains 93 files and six public content routes.

## Exclusion assertions

- unexpected content routes: 0;
- `/dat-lich`: absent;
- `/motion-lab*`: absent;
- dynamic service/article details: absent;
- `/khong-gian`, `/san-pham`, `/dao-tao`, `/nhuong-quyen`: absent;
- booking runtime/static trace: 0;
- dead internal links: 0;
- invalid public fragments: 0;
- public pages missing or duplicating `h1`: 0.

`sitemap.xml` contains exactly the six public routes. `robots.txt` points to the configured GitHub
Pages sitemap. No JSON-LD emitter was restored.

## Final graph

```text
                TOPLINK WEBSITE
                      |
        +-------------+--------------+
        v             v              v
      ABOUT        SERVICES       PROCESS
        |             |              |
        +-------------+--------------+
                      v
                 UNDERSTANDING
                      |
                +-----+-----+
                v           v
              NEWS       CONTINUE
                |           |
                +-----+-----+
                      v
              OPTIONAL CONTACT
                +-----+-----+
                v           v
               ZALO      FACEBOOK
```

There is no booking node.
