<template>
  <CBox>
    <CBox>
      <CProgress :value="surveyStep * (100 / answers.length)" />
    </CBox>
    <Container>
      <CGrid template-columns="repeat(12, 1fr)" gap="6">
        <CBox grid-column-start="4" grid-column-end="10">
          <CBox my="4">
            <CHeading as="h1" font-size="2xl">{{ stop.stopName }}</CHeading>
            <CBox color="gray.500">
              <CText as="span" font-weight="semibold" mr="1">Stop ID: </CText>
              <CText as="span">{{ stop.stopCode }}</CText>
            </CBox>
          </CBox>
          <CBox v-if="surveyStep > 1">
            <CButton variant-color="blue" @click="prev()">Back</CButton>
          </CBox>
          <transition name="slide-fade" mode="out-in">
            <CBox
              :key="surveyStep"
              bg="white"
              shadow="sm"
              p="8"
              w="100%"
              rounded="lg"
            >
              <template v-if="surveyStep">
                <nuxt-child
                  v-model="answers[surveyStep - 1]"
                  :current-step="surveyStep"
                  :total-steps="answers.length"
                  :question="getQuestion(answers[surveyStep - 1].questionId)"
                />
              </template>
              <template v-else>
                <nuxt-child :step.sync="surveyStep" />
              </template>
            </CBox>
          </transition>
        </CBox>
      </CGrid>
    </Container>
    <template v-if="surveyStep > 0">
      <CBox
        position="fixed"
        w="100%"
        bottom="0"
        bg="white"
        shadow="sm"
        border-top-width="1px"
        p="3"
      >
        <template v-if="surveyStep < answers.length">
          <CButton
            d="block"
            w="100%"
            :disabled="answers[surveyStep - 1].value === null"
            variant-color="blue"
            size="lg"
            @click="next()"
          >
            Continue
          </CButton>
        </template>
        <template v-else>
          <CButton
            variant-color="blue"
            :disabled="answers[surveyStep - 1].value === null || isSaving"
            size="lg"
            @click="complete()"
          >
            Complete!
          </CButton>
        </template>
      </CBox>
    </template>
  </CBox>
</template>

<script>
import Container from '~/components/global/Container.vue'
export default {
  name: 'SurveyPage',
  components: { Container },
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
