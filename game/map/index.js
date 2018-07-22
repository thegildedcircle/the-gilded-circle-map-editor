const generate = require('./generate')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./server/game/map/map.json')
const db = low(adapter)

module.exports = {
  INIT (W, H) {
    // db.defaults({ MAP: [] })
    //   .write()

    // this._map = this.GET()

    // if (this._map.length === 0) {
    this._map = generate.base(W, H)
    this._map = generate.biome(this._map)
    this.SET(this._map)
    return this.GET()
    // }
  },

  SET (map) {
    db.set('MAP', map)
      .write()
    return this.GET()
  },

  GET () {
    return db.get('MAP').value()
  },

  GET_TILE (x, y) {
    return this.GET_ROW(y)[x]
  }
}
