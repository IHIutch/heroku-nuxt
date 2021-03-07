<template>
  <div>
    <div class="mb-4">
      <span>Question {{ currentStep }} of {{ totalSteps }}</span>
    </div>
    <template v-if="question.type == 'yes_no'">
      <YesNoQuestion :question="question" :answer.sync="answer" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'Step',
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
    answer: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
