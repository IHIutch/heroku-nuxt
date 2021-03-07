<template>
  <div>
    <div class="text-center">
      <h2>Welcome!</h2>
      <div>
        <span>Start the Survey!</span>
      </div>
      <b-button @click="next()">Start</b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SurveyStart',
  methods: {
    next() {
      this.$emit('update:step', 1)
      this.$router.push(`/survey/${this.$route.params.stopId}/1`)
    },
  },
}
</script>
