import MapTile from './tiles';
import BASE_TILES from './tiles/BASE_TILES';

import config from './generate.config';
import noise from '../utils/noise';

export const base = function (W, H = W) {
  const MAP = [...Array(W).keys()].map(i => Array(H).fill(new MapTile(99)))

  const origin = {
    x: 0.5 + ((Math.random() - 0.5) / 5),
    y: 0.5 + ((Math.random() - 0.5) / 5)
  }

  for (let y = 2; y < H - 2; y++) {
    for (let x = 2; x < W - 2; x++) {
      const nx = ((x - 2) / (W - 2)) - origin.x
      const ny = ((y - 2) / (H - 2)) - origin.y
      const d = config.base.manhattan
        ? Math.abs(nx) + Math.abs(ny)
        : 2 * Math.sqrt(nx * nx + ny * ny)

      let a = 1
      let f = 1
      let e = config.base.multiply
        ? config.base.a * (1 - config.base.b * Math.pow(d, config.base.c))
        : config.base.a - (config.base.b * Math.pow(d, config.base.c))

      for (let o = 0; o < config.base.octaves; o++) {
        const v = noise(nx / config.base.scale * f, ny / config.base.scale * f)

        e += (v * a) / (1 + o)
        a *= config.base.persistence
        f *= config.base.lacunarity
      }

      e = e < 0
        ? 0
        : Math.pow(e, config.base.redistribution)
      e /= 2 + (1 - config.base.persistence)
      e = Math.floor(e * BASE_TILES.getTotal())
      e = e < 0
        ? 0
        : e >= BASE_TILES.getTotal()
          ? BASE_TILES.getTotal() - 1
          : e

      MAP[x][y] = new MapTile(0)
    }
  }

  return MAP
}

export const biome = function (MAP) {
  const origin = {
    x: 0.5,
    y: 0.5
  }

  for (let y = 2; y < MAP.length - 2; y++) {
    for (let x = 2; x < MAP[y].length - 2; x++) {
      const nx = (x / MAP[y].length) - origin.x
      const ny = (y / MAP.length) - origin.y

      let a = 1
      let f = 1
      let nd = 0
      for (let o = 0; o < config.biome.moisture.octaves; o++) {
        const v = noise(nx / config.biome.moisture.scale * f, ny / config.biome.moisture.scale * f)

        nd += (v * a) / (1 + o)
        a *= config.biome.moisture.persistence
        f *= config.biome.moisture.lacunarity
      }
      nd = ~~((nd * 3) - origin.y)
      nd = nd < 0
        ? 0
        : nd >= 3
          ? 2
          : nd

      MAP[x][y].setBiome(nd)
    }
  }

  return MAP
}
