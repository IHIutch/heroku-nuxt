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
  fetchAllQuestions({ commit }, data) {
    commit('SET_QUESTIONS', data)
  },
  fetchUniqueQuestion({ commit }, data) {
    commit('SET_UNIQUE_QUESTION', data)
  },
  createQuestion({ commit }, data) {
    commit('CREATE_QUESTION', data)
  },
  updateQuestion({ commit }, data) {
    commit('UPDATE_QUESTION', data)
  },
  deleteQuestion({ commit }, id) {
    commit('DELETE_QUESTION', id)
  },
}
