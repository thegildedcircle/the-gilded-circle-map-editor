// import map generator from js assets
import WorldMap from '~/assets/js/map'
import StringToCharSum from '~/assets/js/utils/StringToCharSum'

import sanitise from 'sanitize-filename'

export const state = () => ({
  map: {
    name: 'world_map',
    tiles: [],
    params: {
      config: {
        seed: '',
        width: 10,
        height: 10
      },
      terrain: {
        octaves: 1,
        persistence: 0
      },
      climate: null
    }
  }
})

export const mutations = {
  MAP_SET_TILES ({ map }) { map.tiles = WorldMap.generate(map.params) },
  MAP_SET_NAME ({ map }, name) { map.name = name },
  MAP_SET_CONFIG ({ map }, config) { map.params.config = config },
  MAP_SET_TERRAIN ({ map }, terrain) { map.params.terrain = terrain },
  MAP_SET_CLIMATE ({ map }, climate) { map.params.climate = climate }
}

export const actions = {
  'map/setParams' ({ commit }, { config, terrain, climate }) {
    if (config.seed && typeof config.seed === 'string') { config.seed = StringToCharSum(config.seed) }
    commit('MAP_SET_CONFIG', config)
    commit('MAP_SET_TERRAIN', terrain)
    commit('MAP_SET_CLIMATE', climate)

    commit('MAP_SET_TILES')
  },
  'map/setName' ({ commit }, name) {
    commit('MAP_SET_NAME', sanitise(name))
  }
}

export const getters = {
  worldMap: state => { return { map: state.map.tiles, name: state.map.name }  }
}