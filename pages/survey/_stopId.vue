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
            <transition name="slide-fade" mode="out-in">
              <div
                :key="surveyStep"
                class="bg-white shadow-sm p-8 w-100 rounded-lg"
              >
                <template v-if="surveyStep">
                  <nuxt-child
                    :current-step="surveyStep"
                    :total-steps="answers.length"
                    :question="getQuestion(answers[surveyStep - 1].questionId)"
                    :answer.sync="answers[surveyStep - 1]"
                  />
                </template>
                <template v-else>
                  <nuxt-child :step.sync="surveyStep" />
                </template>
              </div>
            </transition>
          </b-col>
        </b-row>
      </b-container>
    </b-row>
    <b-row v-if="surveyStep > 0">
      <b-col class="fixed-bottom bg-white shadow-sm border-top p-3">
        <template v-if="surveyStep < answers.length">
          <b-button
            :disabled="answers[surveyStep - 1].value == null"
            variant="primary"
            block
            size="lg"
            @click="next()"
          >
            Continue
          </b-button>
        </template>
        <template v-else>
          <b-button
            variant="primary"
            :disabled="answers[surveyStep - 1].value == null || isSaving"
            block
            size="lg"
            @click="complete()"
            >Complete!</b-button
          >
        </template>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'SurveyPage',
  asyncData({ $axios, route, error }) {
    const stopId = route.params.stopId

    return $axios
      .$get(`${$axios.defaults.baseURL}/survey/${stopId}`)
      .then((res) => {
        if (res) {
          const [stop, questions, watcher] = res
          return {
            stop,
            questions,
            watcher: watcher ? watcher.status : [],
          }
        } else {
          throw new Error(error)
        }
      })
      .catch((err) => {
        error({ statusCode: 404, message: err })
      })
  },
  data() {
    return {
      isSaving: false,
      questionCount: 5,
      surveyStep: 0,
      answers: [],
    }
  },
  watch: {
    '$route.params'() {
      if (this.$route.params.surveyStep) {
        this.surveyStep = this.$route.params.surveyStep
      }
    },
  },
  created() {
    if (!this.surveyStep) {
      this.$router.push(`/survey/${this.stop.stopId}`)
    }
    if (!this.watcher.length) {
      // Initial watcher set
      this.watcher = this.questionMap()
    }
  },
  mounted() {
    this.filterQuestions()
  },
  methods: {
    getQuestion(id) {
      return this.questions.find((question) => {
        return question.id === id
      })
    },
    questionMap() {
      return this.questions.map((question) => {
        return question.id
      })
    },
    filterQuestions() {
      const arr = []
      while (this.answers.length < this.questionCount) {
        const randomIdx = Math.floor(Math.random() * this.watcher.length)
        if (!arr.includes(this.watcher[randomIdx])) {
          arr.push(this.watcher[randomIdx])
          this.answers.push({
            questionId: this.watcher[randomIdx],
            value: null,
          })
          this.watcher.splice(randomIdx, 1)
          if (!this.watcher.length) {
            this.watcher = this.questionMap()
          }
        }
      }
    },
    complete() {
      this.isSaving = true
      this.$axios
        .$post(`${this.$axios.defaults.baseURL}/survey/${this.stop.stopId}`, {
          answers: this.answers,
          watcher: this.watcher,
        })
        .then((data) => {
          this.isSaving = false
          this.$router.push(`/survey/${this.stop.stopId}/thank-you`)
        })
        .catch((err) => {
          throw new Error(err)
        })
    },
    next() {
      this.surveyStep++
      this.$router.push(`/survey/${this.stop.stopId}/${this.surveyStep}`)
    },
    prev() {
      this.surveyStep--
      this.$router.go(-1)
    },
  },
}
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
