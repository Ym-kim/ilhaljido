# Support discovery benchmark — 2026-07-30

## Current baseline

- Source branch: `origin/main` at `95a8d2e`
- Production deployment: `dpl_BbapbYN35bg5gHjQSuMK8oxRJHvL` (`READY`)
- Monthler pages inspected at desktop 1440×900 and mobile-oriented structures: program catalog, filter panel, half-price travel hub, and a current Wando detail page.
- Official policy reference: Ministry of Culture, Sports and Tourism, “지역사랑 휴가지원 시범사업”, checked 2026-07-30.

## Benchmark decisions

| Monthler element | Strength | Wakation application | Modified for Wakation | Not adopted |
| --- | --- | --- | --- | --- |
| Search and filters | Search is the first action; status, duration, theme and region share one panel | Search over program, region and benefit; URL-backed status, region, duration and support filters | Only filters backed by catalog metadata are shown | Decorative theme icons and filter overload |
| Duration categories | Users can distinguish a short trip from a month-long stay quickly | Up to 4 nights, 5–9 nights, 10+ nights and flexible | Category names remain customer-facing in KO/EN/JA | Guessing duration from titles |
| Program cards | Region, deadline, benefit and D-day are scannable | Editorial 4:3 image, region, verified status, benefit and one clear detail CTA | D-day appears only for a machine-readable official deadline | Applicant counts and unverifiable popularity |
| D-day | Makes true deadlines easy to compare | Calculated only when `applicationEnd` exists | “Closing soon” is limited to the last 14 days | False urgency or parsing prose into dates |
| Detail structure | Eligibility, travel dates, support, proof and application are separated | Internal summary precedes the official source | Unknown facts are explicitly marked and official source wins | Copying administrative notices or acting as the application agent |
| Save and reminder | Creates a reason to return | Browser-local saving and `.ics` deadline export | No email promise without a delivery workflow | Public progress counts or fake notifications |
| Half-price travel | Explains the program before listing regions | A policy guide covers advance application, eligible spending, proof and local-currency reimbursement | Current local availability is left to verified official notices | “Anyone gets 50%” language |
| Program registration | Enables supply-side growth | Existing reviewed submission route remains | Official notice URL is requested and nothing is auto-published | Instant public marketplace listing |

## Card measurements observed

- Monthler desktop cards measured around 306px wide and 377–438px high, with a roughly 1.3:1 image ratio.
- Card height varied when comments or longer titles appeared.
- Wakation keeps a 4:3 image, two-line title, two-line summary and a bottom-aligned CTA within its existing editorial card language.

## Information and trust policy

1. `SUPPORT_PROGRAMS` remains the public-copy and official-URL source of truth.
2. `src/lib/support/catalog.ts` adds optional machine-readable metadata without filling unknown facts.
3. Exact D-day is limited to entries with ISO `applicationEnd`.
4. Foreign-resident eligibility defaults to `unknown`; no positive badge is rendered without an official basis.
5. Wakation links to the operating institution and does not present itself as the application, selection, payment, cancellation or reimbursement party.

