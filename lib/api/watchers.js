import QueryString from 'qs'

export const getWatchers = async ($http, params = null) => {
  try {
    const data = await $http.$get(`/watchers?` + QueryString.stringify(params))
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const getWatcher = async ($http, id) => {
  try {
    const data = await $http.$get(`/watchers/${id}`)
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const postWatcher = async ($http, payload) => {
  try {
    const data = await $http.$post(`/watchers`, { payload })
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const putWatcher = async ($http, id, payload) => {
  try {
    const data = await $http.$put(`/watchers/${id}`, { payload })
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const deleteWatcher = async ($http, id) => {
  try {
    const data = await $http.$delete(`/watchers/${id}`)
    return data
  } catch (err) {
    throw new Error(err)
  }
}
