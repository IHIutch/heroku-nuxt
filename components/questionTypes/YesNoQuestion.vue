<template>
  <CBox>
    <CBox mb="4">
      <CText font-size="2xl">{{ question.text }}</CText>
    </CBox>
    <CStack spacing="4">
      <CBox v-for="(a, idx) in question.answers" :key="idx">
        <CButton
          :variant-color="value && value.value === a.value ? 'blue' : 'gray'"
          d="block"
          w="100%"
          @click="handleClick(a.value)"
        >
          {{ a.text }}
        </CButton>
      </CBox>
    </CStack>
  </CBox>
</template>

<script>
export default {
  name: 'YesNoQuestion',
  props: {
    question: {
      type: Object,
      default: () => {},
    },
    value: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handleClick(value) {
      this.$emit('input', { ...this.value, value })
    },
  },
}
</script>
