import { Composition, Folder } from 'remotion'
import { MonthlyModelEdit } from './monthly-model-edit/MonthlyModelEdit'

export const RemotionRoot = () => (
  <Folder name="Wakation-monthly-editorial">
    <Composition
      id="MonthlyModelEdit202608"
      component={MonthlyModelEdit}
      durationInFrames={450}
      fps={30}
      width={1080}
      height={1920}
    />
  </Folder>
)
