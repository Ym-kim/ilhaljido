# Wakation monthly model editorial operations

## Cadence

- Run on the first weekday of each month.
- Produce one current-month visual edit for `/about`; do not restore the intentionally removed Home `MediaSection`.
- Use a feature branch and Preview. Production merge remains an approval step.

## Rotation

1. Read `src/lib/media/modelRotation.ts` and call the same least-exposed logic represented by `getNextEditorialModels()`.
2. Exclude the previous month's identities when at least three other context-eligible identities exist.
3. Use three identities with different visual roles and never exceed the 25% identity-share cap.
4. Keep at least half of major customer surfaces place-, story- or product-led rather than model-led.

## Required output

- Three new 1200×1500 WebP editorial photographs, each below 300 KB.
- One 1080×1920, 15-second, silent H.264 MP4 below 2.2 MB.
- One updated current-month section in `MonthlyModelEditorial` with KO/EN/JA copy, localized alt text, editorial disclosure, lazy video loading, pause control and reduced-motion poster fallback.
- Updated media manifest, roster production assets, deterministic rotation registry and the month's prompt/source record.

## Truth and rights

- Identity anchors and source sheets are generation inputs only. Never copy them into `public/`.
- Use generated derivatives only and mark them `sourceType: generated` and `illustrative: true`.
- Never represent a generated person as a customer, participant, reviewer, guide, employee or real program scene.
- Do not generate fake hotel rooms, partner products, landmarks, transport operators or readable venue signage.
- No reviews, ratings, popularity numbers, urgency or affiliate claims may be inferred from a visual.

## QA and delivery

Run:

```text
npx tsc --noEmit
npm run lint
npm run build
npm run audit:monthly-model-editorial
npm run audit:media
npm run audit:ui
```

Inspect the three new images, four representative video frames, `/about` at mobile and desktop widths, reduced-motion behavior, video pause control, console output and horizontal overflow. Commit and push the feature branch, create a Preview and request merge/Production approval.
