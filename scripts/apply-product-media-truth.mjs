import fs from 'node:fs'
import ts from 'typescript'

const FILES = [
  'src/lib/affiliate/featured.ts',
  'src/lib/affiliate/items.ts',
]

const MEDIA = {
  urban: '/media/product-editorial/accommodation-urban-studio-editorial-v1.webp',
  tropical: '/media/product-editorial/tropical-coliving-editorial-v1.webp',
  social: '/media/product-editorial/social-stay-lounge-editorial-v1.webp',
  coastal: '/media/product-editorial/coastal-apartment-editorial-v1.webp',
  serviced: '/media/product-editorial/serviced-apartment-editorial-v1.webp',
  design: '/media/product-editorial/design-hotel-lobby-editorial-v1.webp',
  japanese: '/media/product-editorial/japanese-apartment-editorial-v1.webp',
  highrise: '/media/product-editorial/city-highrise-apartment-editorial-v1.webp',
  coastalResidence: '/media/product-editorial/coastal-residence-editorial-v1.webp',
  tropicalBoutique: '/media/product-editorial/tropical-boutique-room-editorial-v1.webp',
  tokyo: '/media/destinations/tokyo-editorial-v1.webp',
  osaka: '/media/destinations/osaka-editorial-v1.webp',
  fukuoka: '/media/destinations/fukuoka-editorial-v1.webp',
  bali: '/media/destinations/bali-editorial-v1.webp',
  danang: '/media/destinations/danang-editorial-v1.webp',
  chiangmai: '/media/destinations/chiangmai-editorial-v1.webp',
  jeju: '/media/destinations/jeju-editorial-v1.webp',
  seoul: '/media/destinations/seoul-editorial-v1.webp',
  busan: '/media/destinations/busan-editorial-v1.webp',
  taipei: '/media/verified/unsplash/1470004914212-05527e49370b.webp',
  singapore: '/media/verified/unsplash/1525625293386-3f8f99389edd.webp',
}

const COVER_BY_ID = {
  'stay-millennials-shibuya': MEDIA.urban,
  'stay-lively-osaka': MEDIA.design,
  'stay-webase-hakata': MEDIA.social,
  'stay-tribal-bali': MEDIA.tropical,
  'stay-chicland-danang': MEDIA.coastalResidence,
  'stay-playce-jeju': MEDIA.coastal,
  'stay-kantary-chiangmai': MEDIA.tropicalBoutique,
  'stay-adina-sydney': MEDIA.highrise,
  'stay-nomadshub-cebu': MEDIA.social,
  'stay-lyf-sukhumvit-bangkok': MEDIA.design,
  'stay-citizenm-taipei': MEDIA.highrise,
  'stay-mimaru-tokyo': MEDIA.japanese,
  'stay-fraser-seoul': MEDIA.serviced,
  'stay-uh-busan': MEDIA.coastalResidence,
  'stay-skybay-gangneung': MEDIA.coastal,
  'stay-shama-bangkok': MEDIA.serviced,
  'stay-naka-phuket': MEDIA.tropicalBoutique,
  'stay-sanouva-danang': MEDIA.highrise,
  'stay-seaside-nhatrang': MEDIA.coastalResidence,
  'stay-dhts-hcmc': MEDIA.serviced,
  'stay-thenomad-canggu': MEDIA.tropical,
  'stay-ubud-village': MEDIA.tropicalBoutique,
  'stay-fields-seminyak': MEDIA.tropical,
  'stay-lyf-funan-singapore': MEDIA.social,
  'stay-gloria-taipei': MEDIA.design,
  'stay-meriton-kent-sydney': MEDIA.highrise,
  'stay-adina-melbourne': MEDIA.urban,
  'stay-meriton-surfers-goldcoast': MEDIA.coastal,

  'act-tokyo-disney': MEDIA.tokyo,
  'act-osaka-usj': MEDIA.osaka,
  'act-fukuoka-bustour': MEDIA.fukuoka,
  'act-bali-ubud': MEDIA.bali,
  'act-danang-banahills': MEDIA.danang,
  'act-klook-teamlab-tokyo': MEDIA.tokyo,
  'act-klook-osaka-pass': MEDIA.osaka,
  'act-klook-taipei-tour': MEDIA.taipei,
  'act-klook-uss-singapore': MEDIA.singapore,
  'act-klook-nusapenida-bali': MEDIA.bali,
  'act-klook-elephant-chiangmai': MEDIA.chiangmai,

  'feat-tokyo-hotel': MEDIA.japanese,
  'feat-osaka-hotel': MEDIA.japanese,
  'feat-fukuoka-hotel': MEDIA.japanese,
  'feat-bali-hotel': MEDIA.tropicalBoutique,
  'feat-japan-activity': MEDIA.fukuoka,
  'feat-vietnam-hotel': MEDIA.coastal,
  'feat-bali-activity': MEDIA.bali,
  'hotel-booking': MEDIA.design,
  'hotel-tripcom': MEDIA.serviced,
  'activity-kkday': MEDIA.fukuoka,
  'hotel-booking-visa': MEDIA.urban,
  'hotel-booking-market': MEDIA.urban,
  'hotel-booking-domestic': MEDIA.coastalResidence,
  'activity-kkday-domestic': MEDIA.busan,
}

function propertyName(node) {
  return ts.isIdentifier(node.name) || ts.isStringLiteral(node.name) ? node.name.text : undefined
}

function stringProperty(node, name) {
  const property = node.properties.find(
    (candidate) => ts.isPropertyAssignment(candidate) && propertyName(candidate) === name,
  )
  return property && ts.isStringLiteralLike(property.initializer) ? property.initializer.text : undefined
}

for (const file of FILES) {
  let source = fs.readFileSync(file, 'utf8')
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const edits = []

  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const id = stringProperty(node, 'id')
      const coverProperty = node.properties.find(
        (candidate) => ts.isPropertyAssignment(candidate) && propertyName(candidate) === 'coverPhoto',
      )
      if (id && coverProperty && ts.isPropertyAssignment(coverProperty)) {
        const mappedCover = COVER_BY_ID[id]
        if (mappedCover && ts.isStringLiteralLike(coverProperty.initializer)) {
          edits.push({
            start: coverProperty.initializer.getStart(ast),
            end: coverProperty.initializer.getEnd(),
            text: `'${mappedCover}'`,
          })
        }

        const illustrativeProperty = node.properties.find(
          (candidate) => ts.isPropertyAssignment(candidate) && propertyName(candidate) === 'illustrative',
        )
        if (illustrativeProperty && ts.isPropertyAssignment(illustrativeProperty)) {
          edits.push({
            start: illustrativeProperty.initializer.getStart(ast),
            end: illustrativeProperty.initializer.getEnd(),
            text: 'true',
          })
        } else {
          edits.push({
            start: coverProperty.getEnd(),
            end: coverProperty.getEnd(),
            text: ', illustrative: true',
          })
        }
      }
    }
    ts.forEachChild(node, visit)
  }

  visit(ast)
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    source = source.slice(0, edit.start) + edit.text + source.slice(edit.end)
  }
  fs.writeFileSync(file, source)
  console.log(`${file}: applied ${edits.length} media-truth edits`)
}
