<template>
  <CBox text-align="center">
    <CBox mb="4">
      <CHeading as="h2" font-size="xl">Welcome!</CHeading>
      <CBox>
        <CText>Start the Survey!</CText>
      </CBox>
    </CBox>
    <CButton @click="next()">Start</CButton>
  </CBox>
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
