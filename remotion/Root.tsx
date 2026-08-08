import { Composition, Folder } from 'remotion'
import { MonthlyModelEdit } from './monthly-model-edit/MonthlyModelEdit'
import { HomeSeasonalFilm } from './home-seasonal-film/HomeSeasonalFilm'

export const RemotionRoot = () => (
  <>
    <Folder name="Wakation-home-seasonal">
      <Composition
        id="HomeSeasonalFilm202608Desktop"
        component={HomeSeasonalFilm}
        durationInFrames={168}
        fps={24}
        width={1920}
        height={1080}
      />
      <Composition
        id="HomeSeasonalFilm202608Mobile"
        component={HomeSeasonalFilm}
        durationInFrames={168}
        fps={24}
        width={1080}
        height={1920}
      />
    </Folder>
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
  </>
)
