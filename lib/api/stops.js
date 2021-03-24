const getStops = (params = null) =>
  this.$axios.$get(`${this.$axios.defaults.baseURL}/stops`, {
    params: { ...params },
  })

const getStop = (id) =>
  this.$axios.$get(`${this.$axios.defaults.baseURL}/stops/${id}`)

const postStop = (payload) =>
  this.$axios.$post(`${this.$axios.defaults.baseURL}/stops`, {
    payload,
  })

const putStop = (id, payload) =>
  this.$axios.$put(`${this.$axios.defaults.baseURL}/stops/${id}`, {
    payload,
  })

export { getStops, getStop, postStop, putStop }
