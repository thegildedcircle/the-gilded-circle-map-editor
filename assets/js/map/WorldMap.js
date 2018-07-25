import OpenSimplexNoise from 'open-simplex-noise';
import LinearGradient from '../utils/LinearGradient'

import MapTile from './tiles';

const TERRAIN_GRADIENT = new LinearGradient([ 0, 1, 1, 0 ])
const CLIMATE_GRADIENT = new LinearGradient([ 0, 3, 0 ])

export default class WorldMap extends Array {
  constructor (params) {
    // Whenever you extend something, you need to create the thing that you're extending first, 
    // before you create the thing that you want.
    super(...[...Array(params.size.height).keys()].map(i => Array(params.size.width).fill(new MapTile(0, 0))))

    this._params = params
    this._noise = new OpenSimplexNoise(this._params.seed || Date.now())

    this.regenerate(this._params)
  }

  // --- Private Methods
  _generate (generateBase = true, generateBiome = false) {
    const { height, width } = this._params.size

    for (let y = 2; y < height - 2; y++) {
      for( let x = 2; x < width - 2; x++) {
        if (generateBase) {
          const { base } = this._params
          // noise indexes
          const nx = x / width
          const ny = y / height
          // noise frequencies
          const fx = width / 5
          const fy = height / 5
          // linear gradient for island generation
          const gx = TERRAIN_GRADIENT.at(nx)
          const gy = TERRAIN_GRADIENT.at(ny)
          const g = Math.min(gx, gy)

          let amplitude = 1
          let elevation = 0
          for (let i = 0; i < base.octaves; i++) {
            // noise values range from -1 to 1
            // map them to 0 to 1
            const val = (this._noise.noise2D(nx * fx, ny * fy) + 1) / 2
            elevation += (val * amplitude) / (1 + i)
            amplitude *= base.persistence
          }

          // 
          elevation *= g
          // map elevation to 0 to 8 range and then Floor for integer conversion
          // ensure we don't even go over 7 somehow
          elevation = Math.min(~~(elevation * 8), 7)

          this[y][x] = new MapTile(elevation)
        }
        if (generateBiome) {
          // noise indexes
          const nx = x / width
          const ny = y / height
          // noise frequencies
          const fx = width / 4
          const fy = height / 4
          // linear vertical gradient for climate generation
          const gy = CLIMATE_GRADIENT.at(ny)

          // noise values range from -1 to 1
          // map them to 0 to 1
          let climate = (this._noise.noise2D(nx * fx, ny * fy) + 1) / 2
          // map clime to 0 to 3 range and then Floor for integer conversion
          climate *= gy
          climate = ~~(climate * 3)

          this[y][x].setBiome(climate)
        }
      }
    }
  }

  // --- Public Methods
  regenerate ({ base, biome }) {
    // update this._params if any/each of the properties are supplied.
    if (base) this._params.base = base
    if (biome) this._params.biome = biome 

    this._generate(true, true)
  }
}
