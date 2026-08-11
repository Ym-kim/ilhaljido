import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const directionPath = path.join(root, 'src', 'lib', 'media', 'modelVisualDirection.json')
const rotationPath = path.join(root, 'src', 'lib', 'media', 'modelRotation.ts')
const directions = JSON.parse(await fs.readFile(directionPath, 'utf8'))
const rotation = await fs.readFile(rotationPath, 'utf8')
const errors = []

const requiredFields = ['placementId', 'assetIds', 'poseCategory', 'poseFamily', 'silhouetteFamily', 'cameraFamily', 'colorStory', 'primaryAction', 'workProp']
const counts = (field) => directions.reduce((map, item) => map.set(item[field], (map.get(item[field]) ?? 0) + 1), new Map())
const maximumShare = (field) => Math.max(...counts(field).values()) / directions.length
const activePlacementIds = [...rotation.matchAll(/\{ id: '([^']+)'.+status: 'active' \}/g)].map((match) => match[1])

for (const item of directions) {
  for (const field of requiredFields) if (item[field] === undefined || item[field] === '') errors.push(`${item.placementId}: missing ${field}`)
  if (!Array.isArray(item.assetIds) || item.assetIds.length === 0) errors.push(`${item.placementId}: assetIds must be non-empty`)
}

const placementIds = directions.map((item) => item.placementId)
if (new Set(placementIds).size !== placementIds.length) errors.push('Duplicate placementId in model visual direction manifest')
for (const id of activePlacementIds) if (!placementIds.includes(id)) errors.push(`Missing visual direction for active placement: ${id}`)
for (const id of placementIds) if (!activePlacementIds.includes(id)) errors.push(`Visual direction is not backed by an active placement: ${id}`)

const visibleAssetOwners = new Map()
for (const item of directions) {
  for (const assetId of item.assetIds) {
    const owner = visibleAssetOwners.get(assetId)
    if (owner && owner !== item.placementId) errors.push(`Asset ${assetId} is reused by ${owner} and ${item.placementId}`)
    visibleAssetOwners.set(assetId, item.placementId)
  }
}

if (maximumShare('poseCategory') > 0.4) errors.push(`One pose category exceeds 40%: ${(maximumShare('poseCategory') * 100).toFixed(1)}%`)
if (maximumShare('silhouetteFamily') > 0.4) errors.push(`One silhouette family exceeds 40%: ${(maximumShare('silhouetteFamily') * 100).toFixed(1)}%`)
if (maximumShare('cameraFamily') > 0.35) errors.push(`One camera family exceeds 35%: ${(maximumShare('cameraFamily') * 100).toFixed(1)}%`)

const feminineSilhouetteCount = directions.filter((item) => /dress|skirt/.test(item.silhouetteFamily)).length
if (feminineSilhouetteCount / directions.length < 0.3) errors.push('Dress/skirt silhouette share must be at least 30%')
const defaultWorkPropCount = directions.filter((item) => ['laptop', 'paper', 'map'].includes(item.workProp)).length
if (defaultWorkPropCount / directions.length > 0.25) errors.push('Laptop/paper/map shorthand exceeds 25% of placements')

for (let index = 1; index < directions.length; index += 1) {
  const previous = directions[index - 1]
  const current = directions[index]
  if (previous.poseFamily === current.poseFamily && previous.silhouetteFamily === current.silhouetteFamily && previous.cameraFamily === current.cameraFamily) {
    errors.push(`Adjacent placements repeat pose + silhouette + camera: ${previous.placementId}, ${current.placementId}`)
  }
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Model diversity audit passed: ${directions.length} placements, ${counts('poseFamily').size} pose families, ${counts('silhouetteFamily').size} silhouettes, ${counts('cameraFamily').size} camera families, ${counts('colorStory').size} color stories; dress/skirt share ${((feminineSilhouetteCount / directions.length) * 100).toFixed(1)}%; laptop/paper/map share ${((defaultWorkPropCount / directions.length) * 100).toFixed(1)}%.`)
