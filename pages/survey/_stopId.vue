<template>
  <b-container fluid>
    <b-row>
      <b-col class="px-0">
        <b-progress
          variant="info"
          class="rounded-0"
          height="8px"
          :value="surveyStep * (100 / questions.length)"
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
            <div>
              <b-button v-if="surveyStep > 1" variant="link" @click="prev()">
                <span>Back</span>
              </b-button>
            </div>
            <div class="bg-white shadow-sm p-4 w-100">
              <template v-if="surveyStep">
                <transition name="slide-fade" mode="out-in">
                  <div :key="surveyStep">
                    <nuxt-child :question="questions[surveyStep - 1]" />
                  </div>
                </transition>
              </template>
              <template v-else>
                <div class="text-center">
                  <h2>Welcome!</h2>
                  <div>
                    <span>Start the Survey!</span>
                  </div>
                  <b-button @click="next()">Start</b-button>
                </div>
              </template>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-row>
    <b-row v-if="surveyStep > -1">
      <b-col class="fixed-bottom bg-white shadow-sm border-top p-3">
        <b-button
          v-if="surveyStep < questions.length"
          @click="next()"
          :disabled="answers[surveyStep].value == null"
          variant="primary"
          block
        >
          Continue
        </b-button>
        <b-button v-else @click="complete()" variant="primary" block
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
            // questions,
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
      questions: [
        { id: "zero" },
        { id: "one" },
        { id: "two" },
        { id: "three" },
        { id: "four" },
      ],
      questionCount: 5,
      surveyStep: 0,
      answers: [],
    };
  },
  created() {
    if (!this.surveyStep) {
      this.$router.push(`/survey/${this.stop.stopId}`);
    }
    this.answers = this.questions.map((question) => {
      return {
        value: true,
      };
    });
  },
  watch: {
    "$route.params"() {
      if (this.$route.params.surveyStep) {
        this.surveyStep = this.$route.params.surveyStep;
      }
    },
  },
  methods: {
    complete() {
      console.log("Completed!");
    },
    next() {
      this.surveyStep++;
      this.$router.push(`/survey/${this.stop.stopId}/${this.surveyStep}`);
    },
    prev() {
      this.surveyStep--;
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}
</style>
