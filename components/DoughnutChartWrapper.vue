<template>
  <div class="embed-responsive embed-responsive-1by1 pb-3">
    <div
      class="embed-responsive-item d-flex align-items-end justify-content-center"
    >
      <DoughnutChartBasic
        class="position-absolute w-100 top-0"
        :foregroundColor="foregroundColor"
        :backgroundColor="backgroundColor"
        :thickness="thickness"
        :percent="percent"
      />
      <slot></slot>
    </div>
  </div>
</template>

<script>
import DoughnutChartBasic from "@/components/charts/DoughnutChartBasic";

export default {
  name: "DoughnutChartWrapper",
  components: { DoughnutChartBasic },
  props: {
    foregroundColor: {
      type: String
    },
    backgroundColor: {
      type: String
    },
    thickness: {
      type: Number
    },
    percent: {
      type: Number
    }
  }
};
</script>
