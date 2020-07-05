<template>
  <b-container>
    <b-row>
      <b-col>
        {{ stop }}
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "StopPage",
  head() {
    return {
      title: this.stop.stopName,
      meta: [
        {
          hid: "title",
          name: "title",
          content: this.stop.stopName,
        },
        {
          hid: "description",
          name: "description",
          content: this.stop.stopDesc,
        },
      ],
    };
  },
  async asyncData({ $axios, route }) {
    const stopId = route.params.StopId;
    const stop = await $axios.$get(`/api/v1/stops/${stopId}`);
    return { stop };
  },
};
</script>
