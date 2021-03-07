<template>
  <div class="embed-responsive embed-responsive-1by1 pb-3">
    <div
      class="embed-responsive-item d-flex align-items-end justify-content-center"
    >
      <DoughnutChartBasic
        class="position-absolute w-100 top-0"
        :foreground-color="foregroundColor"
        :background-color="backgroundColor"
        :thickness="thickness"
        :percent="percent"
      />
      <slot></slot>
    </div>
  </div>
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
