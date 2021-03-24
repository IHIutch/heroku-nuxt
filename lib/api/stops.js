const getStops = async ($axios, params = null) => {
  try {
    const data = await $axios.$get(`${$axios.defaults.baseURL}/stops`, {
      params: { ...params },
    })
    return data
  } catch (err) {
    throw new Error(err)
  }
}

const getStop = async (id) => {
  try {
    const data = await this.$axios.$get(
      `${this.$axios.defaults.baseURL}/stops/${id}`
    )
    return data
  } catch (err) {
    throw new Error(err)
  }
}

const postStop = async (payload) => {
  try {
    const data = await this.$axios.$post(
      `${this.$axios.defaults.baseURL}/stops`,
      {
        payload,
      }
    )
    return data
  } catch (err) {
    throw new Error(err)
  }
}

const putStop = async (id, payload) => {
  try {
    const data = await this.$axios.$put(
      `${this.$axios.defaults.baseURL}/stops/${id}`,
      {
        payload,
      }
    )
    return data
  } catch (err) {
    throw new Error(err)
  }
}

export { getStops, getStop, postStop, putStop }
