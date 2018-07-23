// TODO: generate a map
import { base, biome } from './generate'

export default {
  generate (params) {
    const baseMap = base(params.size, params.base);
    const biomeMap = biome(baseMap, params.biome);

    return biomeMap;
  }
}