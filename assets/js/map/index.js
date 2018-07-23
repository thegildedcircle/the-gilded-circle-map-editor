// TODO: generate a map
import { base, biome } from './generate';
import { genAltGrid } from './generateWorld';

export default {
  generate (params) {
    const baseMap = base(params.size, params.base);

    let testParams = {
      octaves: [
        {
          val: 0.8,
          wl: 100
        },
        {
          val: 0.2,
          wl: 20
        }
      ]
    }
    // const baseMap = genAltGrid(params.size, testParams);
    const biomeMap = biome(baseMap, params.biome);

    return biomeMap;
  }
}