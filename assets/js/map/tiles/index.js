import BASE_TILES from './BASE_TILES'
import BIOME_TILES from './BIOME_TILES'

export default class MapTile {
  constructor (e, c, f) {
    if (typeof e === 'number') this._setBaseByElevation(e)
    if (typeof c === 'number') this._setBiomeByClimate(c)
    if (typeof f === 'string') this._setFeatureByName(f)
  }

  _setBaseByElevation (e = 0) {
    const base      = BASE_TILES.getByElevation(e)

    this.char       = base.char
    this.colour     = base.colour
    this.base       = base.type
    this.elevation  = e
    this.impassable = base.impassable
  }

  _setBiomeByClimate (c = 1) {
    const biome     = BIOME_TILES.getByClimateAndElevation(c, this.elevation)

    this.biome      = biome.type
    this.char       = biome.char
    this.climate    = c
    this.colour     = biome.colour
    this.impassable = biome.impassable
  }

  _setFeatureByName (f) {
    if (!f) this.feature = null
  }

  setBase (e) {
    this._setBaseByElevation(e)
  }

  setBiome (c) {
    this._setBiomeByClimate(c)
  }

  setFeature (f) {
    this._setFeatureByName(f)
  }
}
