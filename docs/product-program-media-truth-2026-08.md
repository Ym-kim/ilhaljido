# Product and program media truth audit — 2026-08-02

## Objective

Replace repeated or misleading product-card imagery with a controlled set of high-quality editorial assets, localize remaining remote image hotlinks, and make the distinction between exact location photography and non-product editorial imagery visible to customers.

## Policy applied

- A generated or generic photograph must not be presented as the exact partner hotel, room, activity, operator, or hosted-program venue.
- Affiliate cards using non-exact imagery carry `illustrative: true` and display the localized `Editorial image / 편집 이미지 / 編集イメージ` label.
- Exact destination photographs may represent the destination, but not an individual product.
- Licensed assets record source, author, license, transformation, and verification date.
- Generated assets record the final prompt set, creation date, usage, locale alt text, and restrictions in the media manifest.

## Final generated prompt set

All ten images were generated with OpenAI built-in image generation, then visually inspected, center/attention-cropped to 1200×900, and exported as WebP. No image may be described as an exact named property.

### 1. Urban studio

> Photorealistic editorial travel photograph of a compact contemporary East Asian city studio prepared for a workation: neatly made bed, real ergonomic desk by a large window, laptop closed, warm natural morning light, restrained charcoal, walnut and cream materials, credible boutique-hotel styling, lived-in but uncluttered, no people, no text, no logo, no identifiable hotel brand, no impossible architecture, 4:3 landscape composition, premium travel magazine photography, natural lens and believable shadows.

### 2. Tropical coliving

> Photorealistic editorial travel photograph of an open-air tropical coliving courtyard in Southeast Asia: lush real plants, shaded shared timber worktable, comfortable chairs, textured stone and lime-plaster walls, filtered late-morning sun, relaxed long-stay atmosphere, refined rather than resort-glossy, no people, no text, no logo, no identifiable property, no landmark, 4:3 landscape composition, natural documentary hospitality photography.

### 3. Social-stay lounge

> Photorealistic editorial travel photograph of a modern social-stay lounge designed for independent travelers: long communal table, quieter work nook, books and soft task lighting, honest concrete and warm wood, afternoon daylight, subtle signs of use without visible guests, no people, no text, no logo, no identifiable hostel or hotel, 4:3 landscape composition, sophisticated travel magazine image with believable scale and materials.

### 4. Coastal apartment

> Photorealistic editorial travel photograph of a calm coastal apartment for a working traveler: practical desk facing a broad sea view, simple sofa and compact dining area, pale oak and linen, soft blue-hour daylight, realistic modest space rather than luxury fantasy, no people, no text, no logo, no recognizable property or landmark, 4:3 landscape composition, natural high-end editorial photography.

### 5. Serviced apartment

> Photorealistic editorial travel photograph of a long-stay serviced apartment: compact kitchenette, dining-work table, comfortable bed partly visible, storage suitable for a week or month, soft daylight, warm neutral palette, realistic urban proportions and credible fixtures, no people, no text, no logo, no identifiable hotel, 4:3 landscape composition, refined but truthful hospitality editorial photography.

### 6. Design-hotel lobby

> Photorealistic editorial travel photograph of a boutique design-hotel lobby with a quiet work corner: sculptural but usable seating, small desk with task lamp, natural stone, dark wood and muted green accents, soft evening light, calm premium atmosphere, no people, no text, no logo, no identifiable brand or property, 4:3 landscape composition, sophisticated real-world travel editorial photography.

### 7. Japanese-inspired apartment

> Photorealistic editorial travel photograph of a compact contemporary Japanese-inspired apartment suitable for a week-long workation: low-profile bed, practical dining-work table, pale oak, linen, subtle shoji-inspired panels without cultural clichés, soft overcast morning light, believable modest proportions, calm premium travel-magazine styling. No people, no text, no logos, no identifiable hotel or property, no landmark, no impossible architecture, 4:3 landscape composition. Generic editorial accommodation image, not an exact product photo.

### 8. City high-rise apartment

> Photorealistic editorial travel photograph of a modern high-rise serviced apartment for a working traveler: realistic city skyline through a large window, compact desk, comfortable chair, kitchenette edge and luggage bench, late-afternoon natural light, charcoal, warm wood and muted blue palette, refined but believable hospitality photography. No people, no text, no logos, no identifiable brand or property, no recognizable landmark, no impossible reflections, 4:3 landscape composition. Generic editorial accommodation image, not an exact hotel photo.

### 9. Coastal residence

> Photorealistic editorial travel photograph of a bright coastal long-stay residence: balcony doors open to a distant ocean horizon, practical work table placed away from the bed, natural woven textures, pale stone and light wood, fresh morning light, realistic mid-range apartment rather than luxury fantasy, sophisticated travel magazine photography. No people, no text, no logos, no identifiable hotel or property, no recognizable landmark, 4:3 landscape composition. Generic editorial accommodation image, not an exact product photo.

### 10. Tropical boutique room

> Photorealistic editorial travel photograph of a tropical boutique long-stay room with a shaded terrace: credible compact desk, warm teak, textured plaster, real green foliage outside, ceiling fan, filtered golden daylight, elegant but natural Southeast Asian hospitality atmosphere, believable scale and materials. No people, no text, no logos, no identifiable resort or hotel, no landmark, no fantasy architecture, 4:3 landscape composition. Generic editorial accommodation image, not an exact product photo.

## Generated output assets

- `public/media/product-editorial/accommodation-urban-studio-editorial-v1.webp`
- `public/media/product-editorial/tropical-coliving-editorial-v1.webp`
- `public/media/product-editorial/social-stay-lounge-editorial-v1.webp`
- `public/media/product-editorial/coastal-apartment-editorial-v1.webp`
- `public/media/product-editorial/serviced-apartment-editorial-v1.webp`
- `public/media/product-editorial/design-hotel-lobby-editorial-v1.webp`
- `public/media/product-editorial/japanese-apartment-editorial-v1.webp`
- `public/media/product-editorial/city-highrise-apartment-editorial-v1.webp`
- `public/media/product-editorial/coastal-residence-editorial-v1.webp`
- `public/media/product-editorial/tropical-boutique-room-editorial-v1.webp`

## Licensed destination assets

| Asset | Source | License | Change |
| --- | --- | --- | --- |
| Jeonju Hanok Village | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:20240727_Jeonju_Hanok_Village_001.jpg), Jjw | CC BY 4.0 | resized, cropped, WebP |
| Yeosu Harbor | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Korea-Yeosu-Harbor-01.jpg), LWY | CC BY 2.0 | resized, cropped, WebP |

Public attribution is available at `/media-credits`, `/en/media-credits`, and `/ja/media-credits`.

## Audit commands

```bash
npm run audit:product-media-truth
npm run audit:verified-media
npm run audit:card-media
npm run audit:media
```

`audit:product-media-truth` fails when a product record uses remote media or a non-exact local/generated asset without the editorial-image disclosure.
