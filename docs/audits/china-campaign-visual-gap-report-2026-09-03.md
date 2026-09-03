# China Campaign + Visual/Hero Phase — Gap Report

Date: 2026-09-03  
Branch: `feat/china-campaign-visual-hero-v1`  
Base: Production main `601ade9`

## Decision summary

- Stay Engine and Agoda files are out of scope for this branch.
- The current Home, Hosted, Business, Growth and Programs hero assets remain the strongest available choices. No forced model replacement is justified.
- TEMI and BOMI remain optional identity references. Their source ZIPs are not copied into public web assets.
- The supplied eight-second coast and city/cafe videos are not used as-is: both are too large for a Home hero and do not establish a credible Work action.
- The China campaign begins with a no-model editorial comparison system. It avoids presenting a synthetic person or generated streetscape as evidence of an actual Yiwu market, Canton Fair venue or operated trip.

## Visual slot audit

| Slot | Current decision | Reason |
| --- | --- | --- |
| Home hero | KEEP_CURRENT | Existing poster/video art direction preserves Work + Travel and mobile fallback. |
| Home seasonal campaign | NO_MODEL_NEEDED | Route comparison needs clear choice architecture, not another portrait. |
| Hosted hero | KEEP_CURRENT | Current group planning scene communicates real program intent. |
| Business hero | KEEP_CURRENT | Current team action is more credible than the supplied lifestyle clips. |
| Growth hero | KEEP_CURRENT | Existing tactile learning action is distinctive. |
| Programs hero | KEEP_CURRENT | Planning scene matches the portfolio hub. |
| Hotel/provider cards | REAL_PLACE_ONLY | Provider or licensed property imagery only; never synthetic proof. |
| Yiwu/Canton Fair evidence | REAL_PLACE_ONLY | Official/licensed evidence or no photograph. |
| China comparison hero | NO_MODEL_NEEDED | Editorial typography and route diagram provide a truthful first release. |

## Campaign truth state

### Yiwu

- External application page verified on 2026-09-03.
- Published dates: 2026-09-09 to 2026-09-13; four nights/five days.
- External operator shown by the application page: BigPie C&T.
- Wakation provides comparison/editorial context only. Final price, availability, inclusions and cancellation terms stay on the external page.

### Guangzhou

- The official 140th Canton Fair Autumn 2026 phase dates are used only as official fair reference data.
- No matching external group departure was confirmed on 2026-09-03.
- The variant is therefore non-clickable for application and explicitly marked as monitoring.

## Lifecycle and crawler parity

- Home exposure is controlled server-side from 2026-09-03 00:00 KST until 2026-09-09 00:00 KST.
- Home KO/EN/JA pages use hourly revalidation so the expired placement is removed from SSR and crawler-visible HTML.
- The comparison article remains accessible after Home exposure ends; its Yiwu CTA changes to an external availability check.
- The Home placement is one semantic source, not duplicated desktop/mobile DOM.

## UX and data changes

- New single route: `/programs/china-market-research`, with `/en` and `/ja` equivalents.
- Discovery → comparison → planning → trust/source structure.
- Fixed Home editorial placement; no ticker, carousel or aggressive red-sale banner.
- Contextual entry from `/programs/market`.
- Events: `campaign_view`, `campaign_click`, `program_variant_click`, `external_application_click`.
- Event fields: `campaign_id`, `variant`, `placement`, `source_page`, `locale`.

## Performance position

- No new bitmap or video payload is added in the first release.
- Existing Home poster-first and mobile/reduced-motion fallback remain unchanged.
- New campaign JavaScript is limited to route selection and existing analytics calls.

## Deferred visual work

- A China-specific photographic hero remains deferred until licensed real-place media is available.
- If a later model-led transition is produced, it must show route planning or sourcing preparation without implying attendance at a real program.
- Higgsfield Soul 2.0 is a fallback for identity consistency, not a reason to replace current assets.
