import QueryString from 'qs'

const getStops = async ($http, params = null) => {
  try {
    const data = await $http.$get(`/stops?` + QueryString.stringify(params))
    return data
  } catch (err) {
    throw new Error(err)
  }
}

const getStop = async ($http, id) => {
  try {
    const data = await $http.$get(`/stops/${id}`)
    return data
  } catch (err) {
    throw new Error(err)
  }
}

const postStop = async ($http, payload) => {
  try {
    const data = await $http.$post(`/stops`, {
      payload,
    })
    return data
  } catch (err) {
    throw new Error(err)
  }
}

const putStop = async ($http, id, payload) => {
  try {
    const data = await $http.$put(`/stops/${id}`, {
      payload,
    })
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export { getStops, getStop, postStop, putStop }
