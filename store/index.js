// import map generator from js assets
import map from '~/assets/js/map'

export const state = () => ({
  map: []
})

export const mutations = {
  SET_MAP (state, map) { state.map = map }
}

export const actions = {
  'map/generate' ({ commit }, { params }) {
    commit('SET_MAP', map.generate(params))
  }
}

export const getters = {

}