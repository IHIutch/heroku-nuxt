export const state = () => ({
  questions: null,
  unique_question: null,
})

export const mutations = {
  SET_QUESTIONS(state, questions) {
    // eslint-disable-next-line no-sequences
    state.questions = questions.reduce((a, b) => ((a[b.id] = b), a), {})
  },
  SET_UNIQUE_QUESTION(state, question) {
    state.unique_question = question
  },
  CREATE_QUESTION(state, question) {
    state.questions = {
      ...state.questions,
      [question.id]: question,
    }
  },
  UPDATE_QUESTION(state, question) {
    state.questions = {
      ...state.questions,
      [question.id]: { ...question.id, ...question },
    }
  },
  DELETE_QUESTION(state, id) {
    state.questions = Object.values(state.questions).filter((v) => v.id !== id)
  },
}

export const getters = {
  getAllQuestions: (state) => state.questions,
  getOneQuestion: (state) => (id) => {
    return state.questions.find((question) => question.id === id)
  },
  getUniqueQuestion: (state) => state.unique_question,
}

export const actions = {
  async fetchAllQuestions({ commit }) {
    const data = await this.$http.$get(`/questions`)
    commit('SET_QUESTIONS', data)
  },
  async fetchUniqueQuestion({ commit }, id) {
    const data = await this.$http.$get(`/questions/${id}`)
    commit('SET_UNIQUE_QUESTION', data)
  },
  async createQuestion({ commit }, question) {
    const data = await this.$http.$post(`/questions`, { question })
    commit('CREATE_QUESTION', data)
  },
  async updateQuestion({ commit }, question) {
    const data = await this.$http.$put(`/questions/${question.id}`, {
      question,
    })
    commit('UPDATE_QUESTION', data)
  },
  async deleteQuestion({ commit }, id) {
    await this.$http.$delete(`/questions/${id}`)
    commit('DELETE_QUESTION', id)
  },
}
