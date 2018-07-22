// import map generator from js assets
import map from '~/assets/js/map'

console.log(map)

export const state = () => ({
  map: []
})

export const mutations = {
  SET_MAP (state, map) { state.map = map }
}

export const actions = {
  'map/generate' ({ commit }, { width, height }) {
    const _map = map.generate(width, height)

    console.log(_map)

    commit('SET_MAP', _map)
  }
}

export const getters = {

}