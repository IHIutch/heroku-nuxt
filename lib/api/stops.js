import QueryString from 'qs'

export const getStops = async ($http, params = null) => {
  try {
    const data = await $http.$get(`/stops?` + QueryString.stringify(params))
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const getStop = async ($http, id) => {
  try {
    const data = await $http.$get(`/stops/${id}`)
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const postStop = async ($http, payload) => {
  try {
    const data = await $http.$post(`/stops`, { payload })
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const putStop = async ($http, id, payload) => {
  try {
    const data = await $http.$put(`/stops/${id}`, { payload })
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const deleteStop = async ($http, id) => {
  try {
    const data = await $http.$delete(`/stops/${id}`)
    return data
  } catch (err) {
    throw new Error(err)
  }
}
