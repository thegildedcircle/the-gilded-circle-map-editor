// import map generator from js assets
import map from '~/assets/js/map'

export const state = () => ({
  map: []
})

export const mutations = {
  SET_MAP (state, map) { state.map = map }
}

export const actions = {
  'map/generate' ({ commit }, { width, height }) {
    const map = map.generate(width, height)

    commit('SET_MAP')
  }
}

export const getters = {

}