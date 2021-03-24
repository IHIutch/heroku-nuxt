export const state = () => ({
  unique_watcher: null,
})

export const mutations = {
  SET_UNIQUE_WATCHER(state, watcher) {
    state.unique_watcher = watcher
  },
}

export const getters = {
  getUniqueWatcher: (state) => state.unique_watcher,
}

export const actions = {
  async fetchUniqueWatcher({ commit }, id) {
    const data = await this.$http.$get(`/watchers/${id}`)
    commit('SET_UNIQUE_WATCHER', data)
  },
  async createWatcher({ commit }, watcher) {
    const data = await this.$http.$post(`/watchers`, { watcher })
    commit('SET_UNIQUE_WATCHER', data)
  },
  async updateWatcher({ commit }, watcher) {
    const data = await this.$http.$put(`/watchers/${watcher.id}`, { watcher })
    commit('SET_UNIQUE_WATCHER', data)
  },
}
