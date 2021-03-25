import QueryString from 'qs'

export const getQuestions = async ($http, params = null) => {
  try {
    const data = await $http.$get(`/questions?` + QueryString.stringify(params))
    return data
  } catch (err) {
    throw new Error(err)
  }
}
export const getQuestion = async ($http, id) => {
  try {
    const data = await $http.$get(`/questions/${id}`)
    return data
  } catch (err) {
    throw new Error(err)
  }
}
export const postQuestion = async ($http, payload) => {
  try {
    const data = await $http.$post(`/questions`, { payload })
    return data
  } catch (err) {
    throw new Error(err)
  }
}
export const putQuestion = async ($http, id, payload) => {
  try {
    const data = await $http.$put(`/questions/${id}`, { payload })
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const deleteQuestion = async ($http, id) => {
  try {
    const data = await $http.$delete(`/questions/${id}`)
    return data
  } catch (err) {
    throw new Error(err)
  }
}
