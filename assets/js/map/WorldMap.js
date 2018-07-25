import MapTile from './tiles';
import BASE_TILES from './tiles/BASE_TILES';

import noise from '../utils/noise';

export default class WorldMap extends Array {
  constructor (params) {
    super(...[...Array(params.size.height).keys()].map(i => Array(params.size.width).fill(null)))
    Object.setPrototypeOf(this, WorldMap.prototype)

    this._params = params
    this.generate()
  }

  generate() {
    const { height, width } = this._params.size

    for (let y = 0; y < height; y++) {
      for( let x = 0; x < width; x++) {
        this[y][x] = new MapTile(0)
      }
    }
  }
}

// export const base = function ({width, height}, params) {
//   const MAP = [...Array(height).keys()].map(i => Array(width).fill(new MapTile(99)))

//   const origin = {
//     x: 0.5 + ((Math.random() - 0.5) / 5),
//     y: 0.5 + ((Math.random() - 0.5) / 5)
//   }

//   for (let y = 2; y < height - 2; y++) {
//     for (let x = 2; x < width - 2; x++) {
//       const nx = ((x - 2) / (width - 2)) - origin.x
//       const ny = ((y - 2) / (height - 2)) - origin.y
//       const d = params.manhattan
//         ? Math.abs(nx) + Math.abs(ny)
//         : 2 * Math.sqrt(nx * nx + ny * ny)

//       let a = 1
//       let f = 1
//       let e = params.multiply
//         ? params.a * (1 - params.b * Math.pow(d, params.c))
//         : params.a - (params.b * Math.pow(d, params.c))

//       for (let o = 0; o < params.octaves; o++) {
//         const v = noise(nx / params.scale * f, ny / params.scale * f)

//         e += (v * a) / (1 + o)
//         a *= params.persistence
//         f *= params.lacunarity
//       }

//       e = e < 0
//         ? 0
//         : Math.pow(e, params.redistribution)
//       e /= 2 + (1 - params.persistence)
//       e = Math.floor(e * BASE_TILES.getTotal())
//       e = e < 0
//         ? 0
//         : e >= BASE_TILES.getTotal()
//           ? BASE_TILES.getTotal() - 1
//           : e

//       MAP[y][x] = new MapTile(e)
//     }
//   }

//   return MAP
// }

// export const biome = function (MAP, params) {
//   const origin = {
//     x: 0.5,
//     y: 0.5
//   }

//   for (let y = 2; y < MAP.length - 2; y++) {
//     for (let x = 2; x < MAP[y].length - 2; x++) {
//       const nx = (x / MAP[y].length) - origin.x
//       const ny = (y / MAP.length) - origin.y

//       let a = 1
//       let f = 1
//       let nd = 0
//       for (let o = 0; o < params.moisture.octaves; o++) {
//         const v = noise(nx / params.moisture.scale * f, ny / params.moisture.scale * f)

//         nd += (v * a) / (1 + o)
//         a *= params.moisture.persistence
//         f *= params.moisture.lacunarity
//       }
//       nd = ~~((nd * 3) - origin.y)
//       nd = nd < 0
//         ? 0
//         : nd >= 3
//           ? 2
//           : nd

//       MAP[y][x].setBiome(nd)
//     }
//   }

//   return MAP
// }
