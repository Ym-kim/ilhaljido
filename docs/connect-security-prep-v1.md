# Connect & Work Safely — preparation, not a security product

Branch: `feat/nord-ready-connect-security-v1`, based on Production main `a4c11ec0fe169643311b6376b91b1b2808d65952`.
This branch is Preview-only pending review. Hero release PR: https://github.com/Ym-kim/ilhaljido/pull/3.

## Bounded scope

- Select's third category keeps `/select/esim` and existing eSIM/Airalo products. Copy expands to connection and work-readiness checks.
- Existing EditorialBanner is reused in Select and eSIM; Business gets a small five-point readiness panel, not a security service.
- One evergreen category article `/select/esim/work-safely`, with KO/EN/JA dedicated routes and canonical/hreflang/sitemap entries. `/guide/[city]` remains a city-only convention.
- Seven concise checks, company policy priority and factual limits of HTTPS/VPN. Reference review: 2026-09-04. FTC pages were directly read; CISA public guidance was available via official search indexing (direct fetch returned 403).
- No new images, dependencies, partner products, offers, logos or externally monetized security links. No Hero, China, Agoda, Stay, Booking, Airalo data or shared affiliate tracking modifications.

## Tracking and future partner activation

Existing `trackEvent` is reused. Visible cards and guide emit `connect_security_view`; internal card navigation emits `connect_security_guide_click`. Fixed placement/locale/audience/source-page allowlist excludes queries, free text, device IDs and form values.

Follow-up audit adds only explicit pre-departure eSIM/backup-data preparation in all three languages and `business_security_interest` on the Business checklist link. This event means editorial interest, not a submitted inquiry or security-product conversion. It is restricted to the Business placement/audience and the same bounded properties. Existing partner guards, form, CTA destinations and layouts are unchanged.

`connectSecurityPartner` and `businessSecurityPartner` are frozen inactive configs. All unconfirmed fields are null. Generic `security_partner_view`/`security_partner_click` helpers are guarded by enabled + complete fields + HTTPS + disclosure + matching audience. No current partner UI or partner events.

`securityPartnerHref` preserves the exact approved URL by default. A later provider-specific adapter may use the bounded context only after documented tracking requirements are confirmed; adapters cannot change origin or introduce URL credentials. No provider SubID names are assumed.

Future activation still requires contractual/URL/offer/disclosure review, the existing AffiliateCard and affiliate disclosure pattern, `sponsored noopener noreferrer`, partner click QA, and separate deployment approval. Setting a flag alone does not create a product card.

## Contact hygiene — TODO, no address replacement

`wakation.sf@gmail.com` remains the published contact in legal data, footer/layout structured data, contact page, multilingual strings and program/infrastructure/learning views.
`no-reply@wakation.kr` is an outbound Resend sender in `src/lib/email/hostNotifications.ts`, not evidence of a staffed inbound contact mailbox.
`system@wakation.kr` is a synthetic healthcheck record identifier in `src/app/api/health/affiliates/route.ts`, not a contact mailbox.
No verified monitored domain address was found in inspected code/docs. Confirm inbound delivery, responsible owner and reply handling before proposing any replacement. No email was sent, no credentials or environment values were printed or changed.

## QA / rollback

Run TypeScript, lint, build, `node --experimental-strip-types scripts/audit-connect-security.mjs`, and existing Hero/China/Stay/affiliate audits. Browser matrix: KO/EN/JA at 320/375/390/430/768/1024/1440; `/business` keeps its established language-context model rather than inventing new locale routes. Test the real tracking helper with a mocked event recorder, including disabled-partner silence, invalid context rejection and no extra properties.

Audit tooling note: the legacy Stay Engine/Pilot scripts still read the old `src/app/page.tsx` wrapper for Home assertions. The actual implementation is in `src/components/home/HomePage.tsx`. Both scripts pass when that read-only input is corrected in memory; neither the existing audit scripts nor Stay/Hero implementation is changed by this branch. Track this pre-existing test-path maintenance separately from product regression.

Rollback is the base main commit above, or reverting this isolated prep commit after approval. It has no migrations, environment changes, billing changes or external security partner dependencies.
