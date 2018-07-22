const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./server/game/map/tiles/BIOME_TILES.json')
const db = low(adapter)

module.exports = {
  _TILES: db.get('BIOME_TILES'),

  getByClimateAndElevation (c, e) {
    c = c >= 3
      ? 2
      : c < 0
        ? 0
        : c

    return this._TILES
      .find((o) => o.elevation === e && o.climate.includes(c))
      .value()
  }
}
