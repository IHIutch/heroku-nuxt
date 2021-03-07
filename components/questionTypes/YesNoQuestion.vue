<template>
  <div>
    <div class="mb-4">
      <span class="h2 mb-0">{{ question.text }}</span>
    </div>
    <b-form-group :id="'question' + _uid" class="mb-0" @input="onInput">
      <b-form-radio
        v-for="(label, idx) in question.answers"
        :key="idx"
        class="d-block mb-2"
        name="question"
        :value="label.value"
        button
        button-variant="outline-primary btn-block"
        size="lg"
        >{{ label.text }}</b-form-radio
      >
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: 'YesNoQuestion',
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
