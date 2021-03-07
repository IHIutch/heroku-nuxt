<template>
  <Container>
    <CGrid template-columns="repeat(12, 1fr)" gap="6">
      <CBox grid-column-start="3" grid-column-end="11">
        <CBox mb="5">
          <QRCode
            :value="`${$config.baseURL}/qr/${$route.params.stopId}`"
            :width="200"
          />
          <CBox d="flex" align-items="center" justify-content="space-between">
            <CHeading as="h1">{{ stop.stopName }}</CHeading>
            <CBox>
              <CButton mr="2" size="sm">Print Poster</CButton>
              <CButton
                variant-color="blue"
                as="nuxt-link"
                :to="`/survey/${stop.stopId}`"
                size="sm"
                >Take Survey</CButton
              >
            </CBox>
          </CBox>
          <CBox>
            <CText as="span" mr="3">Stop Code: {{ stop.stopCode }}</CText>
            <CText as="span" color="gray.500">
              Coords: {{ stop.stopLat }}, {{ stop.stopLon }}
            </CText>
          </CBox>
        </CBox>
        <CGrid template-columns="repeat(5, 1fr)" gap="6">
          <CBox v-for="(cat, idx) in questionByCategory" :key="idx">
            <CBox text-align="center" mb="5">
              <DoughnutChartWrapper
                :foreground-color="getChartForegroundColor(cat.score)"
                :background-color="getChartBackgroundColor(cat.score)"
                :percent="handleScore(cat)"
                :thickness="20"
              >
                <CBox mx="auto">
                  <CBox mb="3">
                    <CText as="span" font-size="3xl">
                      {{ handleScore(cat) }}
                    </CText>
                  </CBox>
                  <CBox>
                    <CText as="span">{{ cat.text }}</CText>
                  </CBox>
                </CBox>
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
            <CFlex justify-content="space-between" mb="2">
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
                        question.answer && question.answer.value === 'true'
                          ? 'green'
                          : question.answer && question.answer.value === 'false'
                          ? 'red'
                          : 'gray'
                      "
                    >
                      {{
                        question.answer && question.answer.value === 'true'
                          ? 'True'
                          : question.answer && question.answer.value === 'false'
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
                      This is a description of the question and why the question
                      is important. There might even be a
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
</template>

<script>
import { getMeta, getColorByNumber } from '@/functions/index'
import {
  CGrid,
  CBox,
  CHeading,
  CText,
  CButton,
  CFlex,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionPanel,
  CAccordionIcon,
  CBadge,
  CLink,
} from '@chakra-ui/vue'
import QRCode from '@/components/QRCode'
import DoughnutChartWrapper from '@/components/DoughnutChartWrapper'
import Container from '~/components/global/Container.vue'

export default {
  name: 'StopPage',
  components: {
    DoughnutChartWrapper,
    QRCode,
    Container,
    CGrid,
    CBox,
    CHeading,
    CText,
    CButton,
    CFlex,
    CAccordion,
    CAccordionItem,
    CAccordionHeader,
    CAccordionPanel,
    CAccordionIcon,
    CBadge,
    CLink,
  },
  asyncData({ $axios, route, error, $config }) {
    const { stopId } = route.params

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
