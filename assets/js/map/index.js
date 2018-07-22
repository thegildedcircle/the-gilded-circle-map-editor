// TODO: generate a map
import { base, biome } from './generate'

export default {
  generate (W, H = W) {
    const baseMap = base(10, 10)
    const biomeMap = biome(baseMap)

    return biomeMap
  }
}