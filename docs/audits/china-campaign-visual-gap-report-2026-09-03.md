# October China Campaign + Hero Video Prototype — Completion Report

Date: 2026-09-03  
Branch: `feat/china-campaign-visual-hero-v1`  
Base: Production main `601ade9`

## CHINA

| Item | Verified implementation |
| --- | --- |
| Yiwu | Group 126 · 2026-10-08 (Thu)–2026-10-12 (Mon) · 4 nights / 5 days |
| Guangzhou | Group 127 · 2026-10-16 (Fri)–2026-10-20 (Tue) · 4 nights / 5 days |
| Page | One comparison route: `/programs/china-market-research`, plus EN/JA locale routes |
| Home | One static editorial placement labelled `OCTOBER · CHINA BUSINESS` |
| External application | Both CTAs use the same live operator application page, which exposes both October programs |
| Lifecycle | `active: true`; Home start 2026-09-03 00:00 KST; Home expiry 2026-10-21 00:00 KST |
| Detail after expiry | Detail remains as an archive; external application CTAs fail closed |
| Tracking | `campaign_view`, `campaign_click`, `program_variant_click`, `external_application_click`; no PII |

Customer-facing campaign source, metadata, structured content, Home copy and route copy contain neither the September Yiwu departure nor Group 125. Prices, hotels, flights, benefits and inclusions are not invented. Wakation is identified as the editor; the external operator remains responsible for application conditions.

## HERO

| Variant | Duration | WebM | MP4 | Poster/LCP surface | Mobile | Decision |
| --- | ---: | ---: | ---: | --- | --- | --- |
| Control | Static | — | — | Current coastal-departure AVIF/WebP | Static crop | Safest Production baseline |
| A | 6.0 s | 1,254,343 B | 1,316,850 B | Coast frame, AVIF/WebP | Static coast poster; no video element | Strongest pure Travel edit, but Work cue is materially weak |
| B | 6.0 s | 1,277,825 B | 1,718,311 B | Existing coastal-work AVIF/WebP | Static Work poster; no video element | Recommended video candidate: one clear Work scene followed by coast and city |

Both prototypes are silent, 1280×720, 24 fps, looped, muted, `playsInline`, control-free and deferred until after the first paint. WebM is requested before H.264. Reduced motion, Save Data, 2G/3G, mobile and playback failure all retain the poster. The default Home route still uses the existing Production hero; comparison is opt-in through `?hero=control-static`, `?hero=video-a` and `?hero=video-b`.

## VISUAL

| Slot | Current | Decision | Model | New visual |
| --- | --- | --- | --- | --- |
| Home hero | Existing coastal departure | KEEP_CURRENT for default; preview A/B | Existing canonical model for B | A and B prototype videos only |
| Home editorial primary | Existing modules | KEEP_CURRENT | Existing cast | None |
| Home October campaign | No October module | NO_MODEL_NEEDED for evidence; editorial traveler image only | Identity not claimed | Urban itinerary-planning editorial image |
| Hosted hero/cards | Existing group/program imagery | KEEP_CURRENT | Existing cast | None |
| Business hero | Existing team-planning scene | KEEP_CURRENT | Existing cast | None |
| Growth hero | Existing learning-action scene | KEEP_CURRENT | Existing cast | None |
| Program hero | Existing planning scene | KEEP_CURRENT | Existing cast | None |
| Global/editorial campaign slots | Existing destination imagery | KEEP_CURRENT | Existing cast or real place | None |
| Yiwu/Canton Fair evidence | Official references | REAL_PLACE_ONLY | No model needed | No synthetic evidence image |

TEMI/BOMI remain optional identity references and their ZIP source files are not copied into public assets. No site-wide model replacement was made.

## PERFORMANCE

- The poster remains the initial high-priority image and the LCP candidate; video is mounted only on eligible desktop devices after load/idle plus a 2.2-second delay.
- Initial video transfer: none. Variant A deferred WebM transfer is 1.25 MB; Variant B is 1.28 MB. Both stay below the 2–4 MB target.
- Mobile video transfer: zero by DOM and source inspection at 320/375/390/430 px; mobile uses AVIF first with WebP fallback.
- CLS protection: fixed hero container and intrinsic poster dimensions are retained.
- Exact field LCP must be judged from Vercel Preview/real-user telemetry; local Browser QA verifies load order and fallback behavior without presenting a synthetic Lighthouse score.

## QA

- TypeScript, ESLint, production build, UI audit, media audit, visual-content audit, Trip Set validation, China campaign audit and Hero prototype audit pass locally.
- KO/EN/JA campaign routes show the two exact October date ranges.
- Campaign layout has no horizontal overflow at 320/375/390/430/1440 px.
- Desktop B selects VP9 WebM, plays muted in a six-second loop and preserves text/search safe areas.
- Mobile B creates no video element and keeps model head, face and work context inside the crop.
- No Agoda/Booking/Stay Engine implementation file is changed by this branch.

## ROLLBACK

The campaign Home placement and all prototype variants are isolated. Removing the branch commit returns to `601ade9`; the default route already remains on the existing Production hero until explicit approval.
