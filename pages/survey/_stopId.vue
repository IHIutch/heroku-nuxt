<template>
  <b-container fluid>
    <b-row>
      <b-col class="px-0">
        <b-progress
          variant="info"
          class="rounded-0"
          height="8px"
          :value="surveyStep * (100 / answers.length)"
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
                    <nuxt-child
                      :question="questions[surveyStep - 1]"
                      :answer.sync="answers[surveyStep - 1]"
                    />
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
    <b-row v-if="surveyStep > 0">
      <b-col class="fixed-bottom bg-white shadow-sm border-top p-3">
        <template v-if="surveyStep < answers.length">
          <b-button
            @click="next()"
            :disabled="answers[surveyStep - 1].value == null"
            variant="primary"
            block
          >
            Continue
          </b-button>
        </template>
        <template v-else>
          <b-button
            @click="complete()"
            variant="primary"
            :disabled="isSaving"
            block
            >Complete!</b-button
          >
        </template>
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
          const [stop, questions, watcher] = res;
          return {
            stop,
            questions,
            watcher: watcher ? watcher.status : [],
          };
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        error({ statusCode: 404, message: err });
      });
  },
  watch: {
    "$route.params"() {
      if (this.$route.params.surveyStep) {
        this.surveyStep = this.$route.params.surveyStep;
      }
    },
  },
  data() {
    return {
      isSaving: false,
      questionCount: 5,
      surveyStep: 0,
      answers: [],
    };
  },
  async created() {
    if (!this.surveyStep) {
      this.$router.push(`/survey/${this.stop.stopId}`);
    }
    if (!this.watcher.length) {
      // Initial watcher set
      this.watcher = this.questionMap();
    }
  },
  mounted() {
    this.filterQuestions();
  },
  methods: {
    questionMap() {
      return this.questions.map((question) => {
        return question.id;
      });
    },
    filterQuestions() {
      let arr = [];
      while (this.answers.length < this.questionCount) {
        let randomIdx = Math.floor(Math.random() * this.watcher.length);
        if (arr.indexOf(this.watcher[randomIdx]) === -1) {
          arr.push(this.watcher[randomIdx]);
          this.answers.push({
            questionId: this.watcher[randomIdx],
            value: null,
          });
          this.watcher.splice(randomIdx, 1);
          if (!this.watcher.length) {
            this.watcher = this.questionMap();
          }
        }
      }
    },
    complete() {
      this.isSaving = true;
      this.$axios
        .$post(`${this.$axios.defaults.baseURL}/survey/${this.stop.stopId}`, {
          answers: this.answers,
          watcher: this.watcher,
        })
        .then((data) => {
          this.isSaving = false;
          this.$router.push(`/stops/${this.stop.stopId}`);
        })
        .catch((err) => console.log(err));
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
