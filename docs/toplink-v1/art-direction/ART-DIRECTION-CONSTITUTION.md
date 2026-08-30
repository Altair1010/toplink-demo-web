# Toplink Art Direction Constitution — V1 planning contract

This file defines the constraints the final `DESIGN.md` must resolve. It does **not** prematurely lock the final font, palette or pattern.

## 1. Desired world

**Contemporary Đông y cung đình / Tân Trung Hoa, medium-to-strong intensity** with enough restraint to remain a healthcare/wellness interface rather than theatrical décor.

From the brand dossier, preserve the tension:

- warm, not dark;
- premium, not ostentatious;
- aged/deep, not old-fashioned;
- Eastern, not mystical about health;
- calm, not cold;
- technological support, not machine worship.

## 2. Visual hierarchy principle

Use ornamental density as a scarce resource.

- Base reading surfaces: calm, legible, materially warm.
- Brand/ceremonial emphasis: thresholds, hero moments, chapter dividers, signature assets.
- Do not put ornate borders, gold, lattice motifs or red accents on every card/button.

## 3. Typography

Final families are unlocked until Phase 3. Required behavior:

- Vietnamese diacritics must render beautifully at display and body sizes.
- Body copy is optimized for 28–55 and older audiences, not fashion-editorial tiny text.
- Heading hierarchy is semantic, not a fixed “eyebrow + huge H2” template.
- Avoid all-caps long Vietnamese headings.
- A display face may carry Eastern/ceremonial character; a highly readable workhorse must carry long text/UI.

## 4. Heading grammar

Use multiple semantic roles:

- narrative heading;
- declarative heading;
- instructional heading;
- evidence heading;
- quiet section heading.

Do not precede every heading with a tiny uppercase kicker.

## 5. Section grammar

Content determines composition. Default rejection:

- endless 3-card grids;
- every section inside rounded containers;
- repeated center-aligned heading/paragraph/card scaffold;
- fake statistics;
- decorative feature tiles without information value.

Approved structural families should include editorial splits, long-form flows, treatment/process narratives, image-led chapters, body/need selectors and evidence-driven blocks.

## 6. Navigation / subtabs

- Navigation follows user mental models, not corporate sitemap jargon.
- Subtabs are text/navigation structures first; pills only when the control genuinely behaves like a compact state switch.
- Mobile controls must remain touch-safe and readable.

## 7. Color

The dossier currently offers provisional seeds such as deep cinnabar/red wine, aged brass, walnut, ivory and brown-black. These are **not production tokens yet**.

Phase 3 must test:

- contrast and WCAG behavior;
- real material/photo compatibility;
- screen vs physical-brand appearance;
- red/gold saturation limits;
- neutral surface family;
- dark/light chapter states.

Never use gold for small low-contrast text on light backgrounds.

## 8. Ornament

Candidate vocabulary from source material may include simplified geometric lattice, moon-gate curves, roof rhythm, lotus/peony, brass/wood/material lines. Rules:

- abstract, do not paste literal “Chinese decorative frame” everywhere;
- one motif family per surface/chapter unless composition needs another;
- ornament never competes with health information;
- CSS/SVG should own scalable semantic motifs; raster texture only where materiality needs it.

## 9. Imagery

Temporary stock is allowed for atmosphere/general editorial context. It must not claim to depict Toplink facility/staff/customers.

Priority future visual vocabulary:

- real hands and treatment gestures;
- real materials/wood/textile/steam/herbs;
- real Toplink spaces;
- human-scale care moments;
- restrained technology-in-context.

No generic smiling-clinic stock as proof. No AI blob illustration as brand filler.

## 10. Motion grammar

Motion must explain or reinforce meaning. Planned semantic families:

- **Threshold** — entering/leaving a chapter/state;
- **Flow** — movement/path/continuity;
- **Release** — tension → space, compressed → open;
- **Breath** — slow ambient spatial rhythm, never pulsing CTA;
- **Focus** — guide attention to active content/control.

Use CSS for small state transitions. Add GSAP only where approved sequences need authored timing/scroll relationships.

Never:

- bounce for prestige/health UI;
- infinite pulsing CTA;
- scroll hijacking;
- every-section fade-up;
- motion that prevents reading;
- active animation under `prefers-reduced-motion: reduce`.

## 11. Commercial tone

The interface may persuade but cannot pressure.

- No urgency countdowns.
- No fear-based health copy.
- No fake scarcity.
- No “contact for price”.
- Contact CTA should be specific and human: choose Zalo/Facebook/phone when intent exists.

## 12. Signature-component mandate

At least one or two page-level interaction/composition signatures should be recognizably Toplink, derived from product truth rather than decorative novelty. Candidates may include a body/need explorer or the Tĩnh → Thông → Dưỡng → Tỉnh journey, but neither is automatically approved until Phase 3.
