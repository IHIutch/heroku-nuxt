<template>
  <div>
    <span class="h3">{{ question.text }}</span>
    <b-form-group v-if="question.numAnswers < 0">
      <b-form-radio-group
        :id="'question' + index"
        v-model="answer.value"
        :options="question.answers"
        stacked
      ></b-form-radio-group>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "MultipleChoiceRadioQuestion",
  props: {
    question: Object,
    answer: Object,
    index: Number
  }
};
</script>
