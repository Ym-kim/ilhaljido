# Wakation visual content audit — 2026-08-01

## Scope and method

- Baseline: `origin/main` / Production `6252977`
- Static route extraction: 124 customer-facing `page.tsx` templates (admin excluded)
- Source section scan: 271 `<section>` blocks across `src/app` and `src/components`
- Browser baseline: `/`, `/programs`, `/select`, `/collections`, `/guide/fukuoka`, `/visa-ai`, `/wishlist`
- Baseline viewports: 390×844 and 1440×900 full-page captures
- The issue labels below can overlap. A section can be both `TEXT_HEAVY` and `DEAD_END`.

## Visual gap inventory

| Route family | Current pattern | Problem type | User question | Recommended visual | Source status | Priority |
| --- | --- | --- | --- | --- | --- | ---: |
| Home / About block | Three equal explanation cards | RELATION_NOT_VISUALIZED, REPETITIVE_CARDS | What does Wakation operate directly? | Service ecosystem map | Existing verified operating copy | 85 |
| Programs portfolio | Five identical editorial cards | REPETITIVE_CARDS, WEAK_HIERARCHY | Which program should I open first? | Featured editorial + compact route index | Existing program catalog | 92 |
| Programs partner categories | Twelve equal status cards | STATUS_NOT_VISUALIZED, TEXT_HEAVY | What can I do now? | Four-column status roadmap | Existing explicit status data | 94 |
| Select category entry | Four equal category cards | JOURNEY_NOT_VISUALIZED | When should I prepare each item? | Preparation timeline | Existing active categories | 90 |
| Collections hub | Twelve equal image cards | REPETITIVE_CARDS, WEAK_HIERARCHY | Which trip set is the main recommendation? | Featured trip set + comparison + compact index | Existing Trip Set data | 87 |
| Guide neighborhoods | Two generic information cards | PLACE_NOT_VISUALIZED | Which area fits my daily rhythm? | Neighborhood rail, explicitly not a map | Existing editor-verified area notes | 82 |
| Wishlist empty state | Large empty box and three plain links | EMPTY_OR_THIN, JOURNEY_NOT_VISUALIZED | How do I create my first saved trip? | First-save journey + contextual actions | Existing save behavior | 84 |
| Visa guide | Three-step selector and official sources | STRONG_VISUAL | What should I verify officially? | Keep current step flow | Official sources dated 2026-08-01 | 74 |
| Support catalog | Filter, status, verification date | STRONG_VISUAL | Is this notice still current? | Keep; later add verified calendar density view | Official-source data | 78 |
| Experience editorial | Hero, facts, course, review source | STRONG_VISUAL | Does this fit a half-day itinerary? | Keep current editorial journey | Affiliate + official product facts | 79 |
| Trip Set detail | Day flow and preparation products | STRONG_VISUAL | How does the stay unfold? | Keep; later add arrival route strips | Existing verified facts | 76 |

## Highest-impact implementation

1. Programs status roadmap — 94
2. Programs portfolio hierarchy — 92
3. Select preparation timeline — 90
4. Collections editorial hierarchy — 87
5. Home service ecosystem — 85
6. Wishlist first-save journey — 84
7. Guide neighborhood rail — 82

## Design decisions

- No new charting or animation library.
- No invented scores, coordinates, maps, or urgency.
- Program images were moved from remote Unsplash hotlinks to existing local, reviewed media assets.
- The Guide rail is a reading order, not a geographic map; it makes no distance claim.
- Generated Trip Set imagery is labelled as editorial imagery in customer UI.
- Each new module retains readable text, semantic lists, keyboard-operable links and color-independent status labels.

## Deferred

- Real coordinate maps: wait for a verified place registry and transit sources.
- Support-program calendar heat map: valuable, but current filters and freshness controls already answer the primary question.
- Visa country comparison: defer until country-purpose-duration data is complete enough for fair comparisons.
- Home scroll reduction beyond the About block: requires conversion analytics before removing further live sections.

