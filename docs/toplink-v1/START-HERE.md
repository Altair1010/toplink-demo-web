# Y Viện Toplink — Headless Commercial Redesign Master Package

**Version:** 1.0.0  
**Date:** 2026-08-30  
**Target:** Full visual/UX/content redesign + production-grade headless WordPress architecture  
**Primary workspace:** `Altair1010/toplink-demo-web`  
**Primary actors:** ChatGPT Web ↔ Codex  

## 1. What this package is

This package is the execution contract for transforming the current H7 static demo into a **commercial, brand-specific, headless website** for **Y Viện Toplink**.

The project is deliberately two tracks that converge:

1. **Experience Reconstruction** — redesign from atomic UI through site architecture, copy, imagery, motion and page morphology.
2. **Production Engineering** — convert the static Next.js demo into a Next.js + WordPress headless platform with editorial workflow, SEO, analytics, external booking handoff and release operations.

The current H7 website is **not a design baseline**. It is a technical salvage source.

## 2. Read order for every new agent/chat

Read these files before proposing or changing code:

1. `DECISIONS.md`
2. `SOURCE-OF-TRUTH.md`
3. `PROJECT-CHARTER.md`
4. `MASTER-PLAN.md`
5. `sources/CURRENT-REPO-BASELINE.md`
6. `art-direction/HALLMARK-IMPECCABLE-ROUTER.md`
7. the phase file relevant to the current work
8. `WORKSTATE.template.md` or the live `docs/toplink-v1/WORKSTATE.md` after this package is installed into the repo

Do **not** treat older `DESIGN.md`/H7 visual decisions as authoritative after Phase 0.

## 3. Decision precedence

When sources conflict:

`current explicit user decision > DECISIONS.md > approved product/evidence data > uploaded brand dossier > new Toplink design constitution > authorized Sen Tài Thu UI reference > Hallmark/Impeccable suggestions > legacy H7 design/code`

## 4. Critical hosting constraint

The user chose Vercel Free/Hobby temporarily. As of 2026-08-30, Vercel's current Terms state that the Hobby plan is for **personal or non-commercial use**. Therefore:

- Vercel Hobby may be used for **development/preview/staging**.
- It must **not** be treated as the final commercial production host.
- Commercial release requires either a commercial Vercel plan or another host/VPS whose terms permit commercial use.

This is a release gate, not a blocker for redesign or headless development.

Reference: https://vercel.com/legal/terms

## 5. New-chat bootstrap prompt

Upload this ZIP to a new ChatGPT chat and send:

> Đọc toàn bộ package theo START-HERE.md. Đây là source of truth cho dự án Y Viện Toplink. Kiểm tra DECISIONS.md và WORKSTATE trước. Không phục hồi art direction H7. GitHub là workspace chung với Codex. Hãy xác định phase hiện tại, các gate đang mở và chỉ thực hiện công việc thuộc phase đó. Nếu cần code, đọc trạng thái repo thật trước khi đề xuất thay đổi.

## 6. Codex bootstrap

See `prompts/CODEX-BOOT.md`.

## 7. Definition of done

The project is not done when it merely builds. It is done when the production candidate is:

- brand-specific rather than AI-generic;
- commercially useful without aggressive health selling;
- able to publish WordPress-managed blog/content without code edits;
- able to route booking intent to verified Zalo/Facebook/phone channels;
- accessible, responsive, fast and visually coherent;
- safe in health claims and honest about evidence;
- SEO/analytics ready;
- operable by staff;
- deployable on a commercial-allowed production runtime;
- reproducible from GitHub with documented rollback.
