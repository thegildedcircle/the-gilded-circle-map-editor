import _ from 'lodash'
import BASE_TILES from '../../../json/map/BASE_TILES.json'

export default {
  _TILES: BASE_TILES,
  getByElevation (e) {
    e = e >= this._TILES.BASE_TILES.length
      ? this._TILES.BASE_TILES.length - 1
      : e < 0
        ? 0
        : e
      
    return _.find(this._TILES.BASE_TILES, { elevation: e })
  },
  getBorder () {
    return _.get(this._TILES, 'BORDER')
  },
  getTotal () {
    return this._TILES.length
  }
}
