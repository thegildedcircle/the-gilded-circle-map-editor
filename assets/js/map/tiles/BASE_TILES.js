const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./server/game/map/tiles/BASE_TILES.json')
const db = low(adapter)

export default {
  _TILES: db.get('BASE_TILES'),

  getByElevation (e) {
    e = e >= this._TILES.value().length
      ? this._TILES.value().length - 1
      : e < 0
        ? 0
        : e

    return this._TILES
      .find({ elevation: e })
      .value()
  },

  getBorder () {
    return db.get('BORDER').value()
  },

  getTotal () {
    return this._TILES.value().length
  }
}
