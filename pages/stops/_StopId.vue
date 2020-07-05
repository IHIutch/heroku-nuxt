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
  async asyncData({ $axios, route, error }) {
    const stopId = route.params.StopId;
    return $axios
      .$get(`/api/v1/stops/${stopId}`)
      .then((res) => {
        if (res) return { stop: res };
        else throw new Error();
      })
      .catch((err) => {
        error({ statusCode: 404, message: "Stop not found" });
      });
  },
};
</script>
