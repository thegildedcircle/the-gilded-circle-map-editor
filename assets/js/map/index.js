// TODO: generate a map
import { base, biome } from './generate'

export default {
  generate (W, H = W) {
    const baseMap = base(W, H)
    const biomeMap = biome(baseMap)

    return biomeMap
  }
}