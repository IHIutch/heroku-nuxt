<template>
  <b-container>
    <b-row>
      <b-col>
        {{ stops }}
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "StopPage",
  head() {
    return {
      title: this.stops[0].stopName,
      meta: [
        {
          hid: "title",
          name: "title",
          content: this.stops[0].stopName,
        },
        {
          hid: "description",
          name: "description",
          content: this.stops[0].stopDesc,
        },
      ],
    };
  },
  async asyncData({ $axios }) {
    const stops = await $axios.$get("/api/v1/stops");
    return { stops };
  },
};
</script>
