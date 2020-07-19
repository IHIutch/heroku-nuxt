<template>
  <div>
    <h1>
      {{ this.$route.params.surveyStep }}
    </h1>
  </div>
</template>

<script>
export default {
  name: "SurveyStep",
  props: {
    steps: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" scoped></style>
