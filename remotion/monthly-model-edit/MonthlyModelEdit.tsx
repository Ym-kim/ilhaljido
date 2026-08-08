import { Series } from 'remotion'
import { EditorialScene } from './scenes/EditorialScene'
import { FinalScene } from './scenes/FinalScene'

const scenes = [
  {
    image: 'media/brand-models/monthly-2026-08-model-e-city-arrival-v1.webp',
    overline: 'ARRIVE',
    title: 'A new city,\nat your own pace.',
    note: 'CITY ARRIVAL · MONTHLY EDIT 08',
    accent: '#79c6d0',
    objectPosition: '52% center',
  },
  {
    image: 'media/brand-models/monthly-2026-08-model-h-coastal-reset-v1.webp',
    overline: 'RESET',
    title: 'Close the laptop.\nKeep the day.',
    note: 'COASTAL RESET · MONTHLY EDIT 08',
    accent: '#d9d09d',
    objectPosition: '54% center',
  },
  {
    image: 'media/brand-models/monthly-2026-08-model-j-blue-hour-v1.webp',
    overline: 'MOVE',
    title: 'Work ends.\nThe city continues.',
    note: 'BLUE HOUR · MONTHLY EDIT 08',
    accent: '#85a8e7',
    objectPosition: '48% center',
  },
] as const

export const MonthlyModelEdit = () => (
  <Series>
    {scenes.map((scene) => (
      <Series.Sequence key={scene.image} durationInFrames={120}>
        <EditorialScene {...scene} durationInFrames={120} />
      </Series.Sequence>
    ))}
    <Series.Sequence durationInFrames={90}>
      <FinalScene />
    </Series.Sequence>
  </Series>
)
