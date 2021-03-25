import QueryString from 'qs'

export const getAnswers = async ($http, params = null) => {
  try {
    const data = await $http.$get(`/answers?` + QueryString.stringify(params))
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const getAnswer = async ($http, id) => {
  try {
    const data = await $http.$get(`/answers/${id}`)
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const postAnswer = async ($http, payload) => {
  try {
    const data = await $http.$post(`/answers`, { payload })
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const putAnswer = async ($http, id, payload) => {
  try {
    const data = await $http.$put(`/answers/${id}`, { payload })
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const deleteAnswer = async ($http, id) => {
  try {
    const data = await $http.$delete(`/answers/${id}`)
    return data
  } catch (err) {
    throw new Error(err)
  }
}
