import _ from 'lodash'
import { BIOME_TILES as tiles } from '../../../json/map/tiles.json'

export default {
  getByClimateAndElevation (c, e) {
    c = c >= 3
      ? 2
      : c < 0
        ? 0
        : c

    return _.find(tiles, (o) => { return o.elevation === e && _.includes(o.climate, c) })
  }
}
