import _ from 'lodash'
import {BIOME_TILES} from '../../../json/map/BIOME_TILES.json'

export default {
  _TILES: BIOME_TILES,
  getByClimateAndElevation (c, e) {
    c = c >= 3
      ? 2
      : c < 0
        ? 0
        : c
        
    return _.find(this._TILES, (o) => o.elevation === e && o.climate.includes(c))
  }
}
