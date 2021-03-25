import QueryString from 'qs'

export const getCategories = async ($http, params = null) => {
  try {
    const data = await $http.$get(
      `/categories?` + QueryString.stringify(params)
    )
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const getCategory = async ($http, id) => {
  try {
    const data = await $http.$get(`/categories/${id}`)
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const postCategory = async ($http, payload) => {
  try {
    const data = await $http.$post(`/categories`, { payload })
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const putCategory = async ($http, id, payload) => {
  try {
    const data = await $http.$put(`/categories/${id}`, { payload })
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export const deleteCategory = async ($http, id) => {
  try {
    const data = await $http.$delete(`/categories/${id}`)
    return data
  } catch (err) {
    throw new Error(err)
  }
}
