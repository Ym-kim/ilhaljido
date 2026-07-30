# Wakation typography, card and media audit

## Benchmark measurements

Measured in the live browser at 1440×900 and 390×844. Values are computed CSS pixels.

| Site | Font | Hero desktop / mobile | H2 desktop / mobile | Body | Card title | Card / CTA observation | Wakation application |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| Jetsetter | HsSantoki + Pretendard | 51 / 27 | 36–48 / 24–26 | 16 / 14 | 18 | 336×484 product; CTA 52–56 high | Restrained editorial heading, 2-line clamp, one CTA |
| MyRealTrip | Pretendard | campaign image-led | 24 / 20 | 14, 23.94 line | 14–16 | Dense category-first marketplace | Keep practical scan speed, avoid density |
| Airbnb | Airbnb Cereal VF / Circular | SEO H1 visually hidden | 22 prominent section | 14 / 20 | 13 / 16 | 180×231 listing rhythm, strict crop | Consistent image geometry and metadata restraint |
| Triple | System sans | 60 / 40 | 48 / 32 | 16 | 22–26 feature copy | Sparse story sections and large visual scenes | Use scale only for campaign/editorial pages |

Jetsetter’s countdown, lowest-price language, wait-count social proof and direct-sale framing were explicitly excluded.

## Pre-change Wakation card measurements

| Card | Width | Height | Image | Finding | New variant |
| --- | ---: | ---: | ---: | --- | --- |
| Select activity product | 276 | 378–400 | 276×192 | Copy changed row height by 22px | Product |
| Home destination | 276 | 208–288 | full bleed | First two cards broke the grid rhythm | Destination |
| Collections hub | 566 | 256–354 | full bleed | Duration flag changed geometry | Editorial |
| Programs / Hosted | 365 | 353 | 365×208 | Badge and repeated icon weight | Editorial |
| MoreExplore | 276 | compact | icon tile | Repeated decoration competed with labels | Compact link |

## Implemented scale

| Token | Value |
| --- | --- |
| Display | `clamp(40px, 5vw, 72px)` |
| Page H1 | `clamp(32px, 3.4vw, 52px)` |
| Section H2 | `clamp(26px, 2.5vw, 40px)` |
| Card H3 | 16px / 1.42 |
| Body large | 16–18px / 1.65 |
| Body | 15px / 1.65 |
| Meta / caption | 12px minimum |
| Button | 14px, 44px minimum target |

Pretendard Variable remains the primary face. The extra Google Noto Sans KR request was removed, reducing external font dependency and eliminating a visible body/heading mismatch. Japanese retains the established local system fallbacks with strict line breaking.

## Generated asset

- File: `public/campaign/programs-editorial-coastal-work-v1.webp`
- Use: Programs hero only
- Source: OpenAI image generation, 2026-07-30
- Status: illustrative; not a real program participant, hotel, or location
- Art direction: restrained blue-hour coastal lounge, one illustrative traveler, left-side headline space, no logo or text
- Restrictions: never caption as a real Wakation field photo or testimonial

