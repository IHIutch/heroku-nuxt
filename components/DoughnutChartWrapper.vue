<template>
  <CAspectRatioBox :ratio="1">
    <CFlex align="center" justify="center">
      <DoughnutChartBasic
        v-chakra
        position="absolute"
        w="100%"
        top="0"
        :foreground-color="foregroundColor"
        :background-color="backgroundColor"
        :thickness="thickness"
        :percent="percent"
      />
      <slot></slot>
    </CFlex>
  </CAspectRatioBox>
</template>

<script>
import DoughnutChartBasic from '@/components/charts/DoughnutChartBasic'

export default {
  name: 'DoughnutChartWrapper',
  components: { DoughnutChartBasic },
  props: {
    foregroundColor: {
      type: String,
      default: 'black',
    },
    backgroundColor: {
      type: String,
      default: 'black',
    },
    thickness: {
      type: Number,
      default: 0,
    },
    percent: {
      type: Number,
      default: 0,
    },
  },
}
</script>
