<template>
  <div>
    <span class="h3">{{ question.text }}</span>
    <b-form-group v-if="question.numAnswers < 0">
      <b-form-radio-group
        :id="'question' + _uid"
        :value="answer.value"
        :options="question.answers"
        stacked
        @input="onInput"
      ></b-form-radio-group>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: 'MultipleChoiceRadioQuestion',
  props: {
    question: {
      type: Object,
      default: () => {},
    },
    answer: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: null,
    },
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    },
  },
}
</script>
