<template>
  <b-container class="py-5">
    <b-row>
      <b-col cols="12" md="8" offset-md="2">
        <div class="mb-5">
          <QRCode
            :value="`${$config.baseURL}/qr/${$route.params.stopId}`"
            :width="200"
          />
          <div class="d-flex align-items-center justify-content-between">
            <h1>{{ stop.stopName }}</h1>
            <b-button variant="primary" size="sm" :to="`/survey/${stop.stopId}`"
              >Take Survey</b-button
            >
          </div>
          <div>
            <span class="mr-3">Stop Code: {{ stop.stopCode }}</span>
            <span class="text-muted">
              Coords: {{ stop.stopLat }}, {{ stop.stopLon }}
            </span>
          </div>
        </div>
        <b-row>
          <b-col v-for="(cat, idx) in questionByCategory" :key="idx">
            <div class="text-center mb-5">
              <DoughnutChartWrapper
                :foreground-color="getChartForegroundColor(cat.score)"
                :background-color="getChartBackgroundColor(cat.score)"
                :percent="handleScore(cat)"
                :thickness="20"
              >
                <div class="mx-auto">
                  <div class="mb-3">
                    <span class="h1">{{ handleScore(cat) }}</span>
                  </div>
                  <div>
                    <span>{{ cat.text }}</span>
                  </div>
                </div>
              </DoughnutChartWrapper>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div
              v-for="(cat, catIdx) in questionByCategory"
              :key="catIdx"
              class="mb-4"
            >
              <div class="d-flex justify-content-between mb-2">
                <h3 class="mb-0">{{ cat.text }}</h3>
              </div>
              <div role="tablist" class="border border-bottom-0">
                <b-card
                  v-for="(question, questionIdx) in cat.questions"
                  :key="questionIdx"
                  no-body
                  border-variant="0"
                >
                  <b-card-header
                    header-tag="header"
                    class="px-0 py-1 bg-transparent"
                    role="tab"
                  >
                    <b-button
                      v-b-toggle="cat.text + '-' + questionIdx"
                      block
                      class="d-flex justify-content-between text-decoration-none py-0 text-dark"
                      variant="link"
                    >
                      <div>
                        <span class="font-weight-bold">
                          {{ question.text }}
                        </span>
                      </div>
                      <div class="d-flex">
                        <div class="mr-3">
                          <template v-if="question.answer">
                            <template v-if="question.answer.value === 'true'">
                              <b-badge variant="success">True</b-badge>
                            </template>
                            <template v-else>
                              <b-badge variant="danger">False</b-badge>
                            </template>
                          </template>
                          <template v-else>
                            <b-badge variant="secondary">Pending</b-badge>
                          </template>
                        </div>
                        <div>
                          <span>
                            <chevron-down-icon />
                          </span>
                        </div>
                      </div>
                    </b-button>
                  </b-card-header>
                  <b-collapse
                    :id="cat.text + '-' + questionIdx"
                    class="border-bottom"
                    accordion="somethings"
                    role="tabpanel"
                  >
                    <div class="p-3">
                      <p class="mb-0">
                        This is a description of the question and why the
                        question is important. There might even be a
                        <a href="#">link to a study</a> about this topic.
                      </p>
                    </div>
                  </b-collapse>
                </b-card>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { getMeta, getColorByNumber } from '@/functions/index'
import { ChevronDownIcon } from 'vue-feather-icons'
import QRCode from '@/components/QRCode'
import DoughnutChartWrapper from '@/components/DoughnutChartWrapper'

export default {
  name: 'StopPage',
  components: {
    ChevronDownIcon,
    DoughnutChartWrapper,
    QRCode,
  },
  asyncData({ $axios, route, error, $config }) {
    const stopId = route.params.stopId

    return $axios
      .$get(`${$axios.defaults.baseURL}/stops/${stopId}`)
      .then((res) => {
        if (res) {
          const [stop, categories, questions, answers] = res
          return {
            stop,
            categories,
            questions,
            answers,
            currentRoute: $config.baseURL + route.path,
          }
        } else {
          throw new Error(error)
        }
      })
      .catch((err) => {
        error({ statusCode: 404, message: err })
      })
  },
  head() {
    return getMeta({
      title: this.stop.stopName,
      url: this.currentRoute,
      description: '',
    })
  },
  computed: {
    answersByQuestion() {
      return this.questions.map((question) => {
        const answer = this.answers.find((a) => {
          return a.questionId === question.id
        })
        return {
          ...question,
          answer,
          score: answer && answer.value === 'true' ? 1 : 0,
        }
      })
    },
    questionByCategory() {
      return this.categories.map((c) => {
        const questions = this.answersByQuestion.filter((q) => {
          return q.categoryId === c.id
        })
        const score = questions.reduce((acc, q) => {
          return (acc += q.score)
        }, 0)
        return {
          id: c.id,
          text: c.text,
          questions,
          score: parseFloat(((score / questions.length) * 100).toFixed(0)),
        }
      })
    },
  },
  methods: {
    navigateToCategory(category) {
      this.$router.push({
        name: 'StopCategoryEditPage',
        params: {
          category: category.title,
        },
      })
    },
    getChartForegroundColor(score) {
      return getColorByNumber(score)
    },
    getChartBackgroundColor(score) {
      return getColorByNumber(score, 0.2)
    },
    handleScore(cat) {
      return cat.questions.some((question) => question.answer === null)
        ? 0
        : cat.score
    },
  },
}
</script>
