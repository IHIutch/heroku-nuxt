<template>
  <b-container fluid>
    <b-row>
      <b-col class="px-0">
        <b-progress
          variant="info"
          class="rounded-0"
          height="8px"
          :value="currentQuestion * 20"
        ></b-progress>
      </b-col>
    </b-row>
    <b-row>
      <b-container>
        <b-row>
          <b-col cols="12" offset="0" md="6" offset-md="3">
            <div class="my-4">
              <h1 class="h3 mb-0">{{ stop.stopName }}</h1>
              <div class="text-muted">
                <span class="font-weight-bold mr-1">Stop ID: </span>
                <span>{{ stop.stopCode }}</span>
              </div>
            </div>

            <nuxt-child :steps="['one', 'two', 'three']" />
          </b-col>
        </b-row>
      </b-container>
    </b-row>
    <b-row v-if="currentQuestion > -1">
      <b-col class="fixed-bottom bg-white shadow-sm border-top p-3">
        <b-button
          v-if="currentQuestion + 1 < questionCount"
          @click="currentQuestion++"
          :disabled="answers[currentQuestion].value == null"
          variant="primary"
          block
        >
          Continue
        </b-button>
        <b-button v-else @click="completeSurvey()" variant="primary" block
          >Complete!</b-button
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "SurveyPage",
  async asyncData({ $axios, route, error, env }) {
    const stopId = route.params.stopId;

    return $axios
      .$get(`${$axios.defaults.baseURL}/survey/${stopId}`)
      .then((res) => {
        if (res) {
          const [stop, questions] = res;
          return {
            stop,
            questions,
          };
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        error({ statusCode: 404, message: err });
      });
  },
  data() {
    return {
      currentQuestion: -1,
      questionCount: 5,
    };
  },
  methods: {
    toggleComments(idx) {
      this.answers[idx].showComment = !this.answers[idx].showComment;
    },
  },
};
</script>
