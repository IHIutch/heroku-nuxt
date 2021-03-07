<template>
  <CBox>
    <CBox mb="4">
      <CText>Question {{ currentStep }} of {{ totalSteps }}</CText>
    </CBox>
    <template v-if="question.type == 'yes_no'">
      <YesNoQuestion v-model="localValue" :question="question" />
    </template>
  </CBox>
</template>

<script>
import YesNoQuestion from '~/components/questionTypes/YesNoQuestion.vue'
export default {
  name: 'Step',
  components: { YesNoQuestion },
  props: {
    currentStep: {
      type: Number,
      default: null,
    },
    totalSteps: {
      type: Number,
      default: null,
    },
    question: {
      type: Object,
      default: () => {},
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      localValue: this.value,
    }
  },
  watch: {
    localValue() {
      this.$emit('input', this.localValue)
    },
  },
}
</script>
