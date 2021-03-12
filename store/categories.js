export const state = () => ({
  categories: [],
  unique_category: {},
})

export const mutations = {
  SET_CATEGORYIES(state, categories) {
    state.categories = categories
  },
  SET_UNIQUE_CATEGORY(state, category) {
    state.unique_category = category
  },
  CREATE_CATEGORY(state, category) {
    state.categories.unshift(category)
  },
  UPDATE_CATEGORY(state, category) {
    state.categories[category.id] = category
  },
  DELETE_CATEGORY(state, id) {
    state.categories.splice(
      state.categories.findIndex((category) => category.id === id),
      1
    )
  },
}

export const getters = {
  getCategories: (state) => state.categories,
  getCategory: (state) => (id) => {
    return state.categories.find((category) => category.id === id)
  },
  getUniqueCategory: (state) => state.unique_category,
}

export const actions = {
  async fetchCategories({ commit }) {
    const data = await this.$axios.$get(
      `${this.$axios.defaults.baseURL}/categories`
    )
    commit('SET_CATEGORYS', data)
  },
  async fetchCategory({ commit }, id) {
    const data = await this.$axios.$get(
      `${this.$axios.defaults.baseURL}/categories/${id}`
    )
    commit('SET_UNIQUE_CATEGORY', data)
  },
  async createCategory({ commit }, category) {
    const data = await this.$axios.$post(
      `${this.$axios.defaults.baseURL}/categories`,
      { category }
    )
    commit('CREATE_CATEGORY', data)
  },
  async updateCategory({ commit }, category) {
    const data = await this.$axios.$put(
      `${this.$axios.defaults.baseURL}/categories/${category.id}`,
      { category }
    )
    commit('UPDATE_CATEGORY', data)
  },
  async deleteCategory({ commit }, id) {
    await this.$axios.$delete(
      `${this.$axios.defaults.baseURL}/categories/${id}`
    )
    commit('DELETE_CATEGORY', id)
  },
}
