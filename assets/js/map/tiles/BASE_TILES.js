import _ from 'lodash'
import { BASE_TILES as tiles } from '../../../json/map/tiles.json'

export default {
  getByElevation (e) {
    e = e >= tiles.length
      ? tiles.length - 1
      : e < 0
        ? 0
        : e
      
    return _.find(tiles, { elevation: e })
  },
  getTotal () {
    return tiles.length
  }
}
