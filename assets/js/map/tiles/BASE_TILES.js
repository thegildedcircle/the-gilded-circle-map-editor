import _ from 'lodash'
import BASE_TILES from '~/assets/json/map/BASE_TILES.json'

export default {
  _TILES: BASE_TILES,
  getByElevation (e) {
    e = e >= this._TILES.value().length
      ? this._TILES.value().length - 1
      : e < 0
        ? 0
        : e

    return _.find(this._TILES, { elevation: e })
  },
  getBorder () {
    return _.get(this._TILES, 'BORDER')
  },
  getTotal () {
    return this._TILES.length
  }
}
