<template>
  <CAspectRatioBox pb="3">
    <CFlex align-items="center" justify-content="center">
      <DoughnutChartBasic
        class="position-absolute w-100 top-0"
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
