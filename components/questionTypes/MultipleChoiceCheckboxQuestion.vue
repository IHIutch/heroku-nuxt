<template>
  <div>
    <span class="h3">{{ question.text }}</span>
    <b-form-group v-if="question.numAnswers < 0">
      <span>Select all that apply.</span>
      <b-form-checkbox-group
        :id="'question' + index"
        v-model="answer.value"
        :options="question.answers"
        stacked
      ></b-form-checkbox-group>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "MultipleChoiceCheckboxQuestion",
  props: {
    question: Object,
    answer: Object,
    index: Number
  }
};
</script>
