<template>
  <CBox>
    <Container v-chakra py="5">
      <CBox
        v-chakra="{
          '@media print': {
            textAlign: 'center',
            display: 'block',
            '#Header, #Footer': { display: 'none !important' },
          },
        }"
        d="none"
      >
        <CBox>
          <CHeading as="h1">{{ stop.stopName }}</CHeading>
        </CBox>
        <CAspectRatioBox :ratio="1">
          <QRCode
            v-chakra
            :value="`${$config.baseURL}/qr/${$route.params.stopId}`"
          />
        </CAspectRatioBox>
      </CBox>
      <CGrid
        v-chakra="{
          '@media print': {
            display: 'none',
          },
        }"
        template-columns="repeat(12, 1fr)"
        gap="6"
      >
        <CBox grid-column-start="3" grid-column-end="11">
          <CBox mb="5">
            <CFlex align="center" justify="space-between">
              <CHeading as="h1">{{ stop.stopName }}</CHeading>
              <CBox>
                <CButton mr="2" size="sm" @click="handlePrint()"
                  >Print QR Code</CButton
                >
                <CButton
                  variant-color="blue"
                  as="nuxt-link"
                  :to="`/survey/${stop.stopId}`"
                  size="sm"
                  >Take Survey</CButton
                >
              </CBox>
            </CFlex>
            <CBox>
              <CText as="span" mr="3">Stop Code: {{ stop.stopCode }}</CText>
              <CText as="span" color="gray.500">
                Coords: {{ stop.stopLat }}, {{ stop.stopLon }}
              </CText>
            </CBox>
          </CBox>
          <CGrid template-columns="repeat(5, 1fr)" gap="6">
            <CBox v-for="(cat, idx) in questionByCategory" :key="idx">
              <CBox text-align="center" w="100%" mb="5">
                <DoughnutChartWrapper
                  :foreground-color="getChartForegroundColor(cat.score)"
                  :background-color="getChartBackgroundColor(cat.score)"
                  :percent="handleScore(cat)"
                  :thickness="20"
                >
                  <CFlex
                    text-align="center"
                    align="center"
                    justify="center"
                    h="100%"
                    w="100%"
                  >
                    <CBox mt="3">
                      <CText as="span" font-size="2xl">
                        {{ handleScore(cat) }}
                      </CText>
                      <CBox>
                        <CText as="span">{{ cat.text }}</CText>
                      </CBox>
                    </CBox>
                  </CFlex>
                </DoughnutChartWrapper>
              </CBox>
            </CBox>
          </CGrid>
          <CBox>
            <CBox
              v-for="(cat, catIdx) in questionByCategory"
              :key="catIdx"
              mb="4"
            >
              <CFlex justify="space-between" mb="2">
                <CHeading as="h3" size="lg">{{ cat.text }}</CHeading>
              </CFlex>
              <CAccordion :allow-toggle="true">
                <CAccordionItem
                  v-for="(question, questionIdx) in cat.questions"
                  :key="questionIdx"
                >
                  <CAccordionHeader>
                    <CFlex flex="1">
                      <CText as="span" font-weight="semibold">
                        {{ question.text }}
                      </CText>
                    </CFlex>
                    <CBox>
                      <CBadge
                        :variant-color="
                          question.answers[0] &&
                          question.answers[0].value === answerType.TRUE
                            ? 'green'
                            : question.answers[0] &&
                              question.answers[0].value === answerType.FALSE
                            ? 'red'
                            : 'gray'
                        "
                      >
                        {{
                          question.answers[0] &&
                          question.answers[0].value === answerType.TRUE
                            ? 'True'
                            : question.answers[0] &&
                              question.answers[0].value === answerType.FALSE
                            ? 'False'
                            : 'Pending'
                        }}
                      </CBadge>
                      <CAccordionIcon />
                    </CBox>
                  </CAccordionHeader>
                  <CAccordionPanel :id="cat.text + '-' + questionIdx">
                    <CBox p="3">
                      <CText>
                        This is a description of the question and why the
                        question is important. There might even be a
                        <a href="#">link to a study</a> about this topic.
                      </CText>
                    </CBox>
                  </CAccordionPanel>
                </CAccordionItem>
              </CAccordion>
            </CBox>
          </CBox>
        </CBox>
      </CGrid>
    </Container>
  </CBox>
</template>

<script>
import { getMeta, getColorByNumber } from '@/functions/index'
import QRCode from '@/components/QRCode'
import DoughnutChartWrapper from '@/components/DoughnutChartWrapper'
import Container from '~/components/global/Container.vue'
import { answerType } from '~/lib/types'
import { getStop } from '~/lib/api/stops'
import { getQuestions } from '~/lib/api/questions'
import { getCategories } from '~/lib/api/categories'

export default {
  name: 'StopPage',
  components: {
    DoughnutChartWrapper,
    QRCode,
    Container,
  },
  data() {
    return {
      answerType,
      answers: [],
    }
  },
  async fetch({ store, route, $http }) {
    if (
      (!store.getters['stops/getUniqueStop'] ||
        store.getters['stops/getUniqueStop'].id !==
          parseInt(route.params.stopId)) &&
      (!store.getters['stops/getAllStops'] ||
        !store.getters['stops/getOneStop'](route.params.stopId))
    ) {
      const data = await getStop($http, route.params.stopId)
      store.dispatch('stops/fetchUniqueStop', data)
    }
    if (!store.getters['questions/getAllQuestions']) {
      const data = await getQuestions($http)
      store.dispatch('questions/fetchAllQuestions', data)
    }
    if (!store.getters['categories/getAllCategories']) {
      const data = await getCategories($http)
      store.dispatch('categories/fetchAllCategories', data)
    }
  },
  head() {
    return getMeta({
      title: this.stop.stopName,
      url: this.$config.baseURL + this.$route.path,
      description: '',
    })
  },
  computed: {
    stop() {
      return this.$store.getters['stops/getUniqueStop']
    },
    questions() {
      return this.$store.getters['questions/getAllQuestions']
    },
    categories() {
      return this.$store.getters['categories/getAllCategories']
    },
    answersByQuestion() {
      return Object.values(this.questions).map((q) => {
        const answers = this.stop.answers.filter((a) => q.id === a.questionId)
        return {
          ...q,
          answers,
          score: answers.length && answers[0].value === answerType.TRUE ? 1 : 0,
        }
      })
    },
    questionByCategory() {
      return Object.values(this.categories).map((c) => {
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
    handlePrint() {
      window.print()
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

<style lang="scss" scoped>
@page {
  size: auto;
  margin: 0mm;
}
</style>
