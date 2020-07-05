<template>
  <div>
    <div class="mb-4">
      <h2 class="h4 mb-0">{{ question.text }}</h2>
    </div>
    <b-form-group class="mb-0" :id="'question' + index">
      <b-form-radio
        class="d-block mb-2"
        :name="'question' + index"
        v-model="answer.value"
        v-for="(label, idx) in question.boolLabels"
        :value="label.value"
        :key="idx"
        button
        button-variant="outline-primary btn-block"
        >{{ label.text }}</b-form-radio
      >
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "YesNoQuestion",
  props: {
    question: Object,
    answer: Object,
    index: Number
  }
};
</script>
