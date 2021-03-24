export const state = () => ({
  categories: null,
  unique_category: null,
})

export const mutations = {
  SET_CATEGORIES(state, categories) {
    // eslint-disable-next-line no-sequences
    state.categories = categories.reduce((a, b) => ((a[b.id] = b), a), {})
  },
  SET_UNIQUE_CATEGORY(state, category) {
    state.unique_category = category
  },
  CREATE_CATEGORY(state, category) {
    state.categories = {
      ...state.categories,
      [category.id]: category,
    }
  },
  UPDATE_CATEGORY(state, category) {
    state.categories = {
      ...state.categories,
      [category.id]: { ...category.id, ...category },
    }
  },
  DELETE_CATEGORY(state, id) {
    state.categories = Object.values(state.categories).filter(
      (v) => v.id !== id
    )
  },
}

export const getters = {
  getAllCategories: (state) => state.categories,
  getOneCategory: (state) => (id) => {
    return state.categories.find((category) => category.id === id)
  },
  getUniqueCategory: (state) => state.unique_category,
}

export const actions = {
  async fetchAllCategories({ commit }) {
    const data = await this.$http.$get(`/categories`)
    commit('SET_CATEGORIES', data)
  },
  async fetchUniqueCategory({ commit }, id) {
    const data = await this.$http.$get(`/categories/${id}`)
    commit('SET_UNIQUE_CATEGORY', data)
  },
  async createCategory({ commit }, category) {
    const data = await this.$http.$post(`/categories`, { category })
    commit('CREATE_CATEGORY', data)
  },
  async updateCategory({ commit }, category) {
    const data = await this.$http.$put(`/categories/${category.id}`, {
      category,
    })
    commit('UPDATE_CATEGORY', data)
  },
  async deleteCategory({ commit }, id) {
    await this.$http.$delete(`/categories/${id}`)
    commit('DELETE_CATEGORY', id)
  },
}
