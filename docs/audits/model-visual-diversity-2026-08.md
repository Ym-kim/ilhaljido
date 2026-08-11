# Model visual diversity audit — 2026-08-11

## Problem confirmed

The active model system had face diversity, but the scene direction was repetitive: long-haired women in neutral summer separates, standing or sitting at eye level, looking down at paper, a map or a laptop. Programs reused the Hosted hero exactly, Learn and Growth reused one asset pair, and four city lookbooks repeated walking/standing silhouettes.

## Corrected surfaces

| Surface | Previous shorthand | New direction |
| --- | --- | --- |
| Trip Match | standing itinerary choice | low-angle crouched luggage-ribbon action; tomato shirt dress |
| Select | seated phone/itinerary | overhead floor-packing action; raspberry midi skirt |
| Programs | duplicated Hosted planning table | regional-station stair descent; cobalt shirt and tailored shorts |
| Growth | duplicated note/map table | hands-on pottery learning; violet midi dress and cobalt apron |
| Business | solo folio portrait | three-person rooftop session with standing, perched and presenting roles |
| Fukuoka guide | laptop and paper at café | crouching at a market to choose ceramics; yellow shirt dress |
| Seoul guide | straight walk with laptop sleeve | seated art-book reading; emerald belted dress |
| Busan guide | straight coastal walk | seated scarf-tying on harbor steps; cobalt pleated skirt |
| Jeju guide | straight stone-lane walk | seated camera pause on a basalt coast; marigold A-line skirt |

All replacements are illustrative generated editorial assets, not evidence of real customers, products, programs or venues. They were produced with OpenAI built-in ImageGen, optimized as WebP plus AVIF derivatives, and registered in `src/lib/media/assets.ts`.

## Ongoing gate

`src/lib/media/modelVisualDirection.json` is the active placement-level source of truth for pose, silhouette, camera, color, action and prop use. `npm run audit:model-diversity` fails on missing active placements, reused assets, excessive pose/camera/silhouette concentration, insufficient dress/skirt representation, or excessive laptop/paper/map shorthand.
