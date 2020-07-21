<template>
  <b-container class="py-5">
    <b-row>
      <b-col cols="8" offset="2">
        <div class="mb-5">
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
                :foregroundColor="getChartForegroundColor(cat.score)"
                :backgroundColor="getChartBackgroundColor(cat.score)"
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
                  no-body
                  border-variant="0"
                  v-for="(question, questionIdx) in cat.questions"
                  :key="questionIdx"
                >
                  <b-card-header
                    header-tag="header"
                    class="px-0 py-1 bg-transparent"
                    role="tab"
                  >
                    <b-button
                      block
                      v-b-toggle="cat.text + '-' + questionIdx"
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
                    class="border-bottom"
                    :id="cat.text + '-' + questionIdx"
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
import { getMeta, getColorByNumber } from "@/functions/index";
import { ChevronDownIcon } from "vue-feather-icons";

export default {
  name: "StopPage",
  components: {
    ChevronDownIcon,
  },
  head() {
    return getMeta({
      title: this.stop.stopName,
      url: this.currentRoute,
      description: "",
    });
  },
  async asyncData({ $axios, route, error, env }) {
    const stopId = route.params.stopId;

    return $axios
      .$get(`${$axios.defaults.baseURL}/stops/${stopId}`)
      .then((res) => {
        if (res) {
          const [stop, categories, questions, answers] = res;
          return {
            stop,
            categories,
            questions,
            answers,
            currentRoute: env.baseURL + route.path,
          };
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        error({ statusCode: 404, message: err });
      });
  },
  methods: {
    navigateToCategory(category) {
      this.$router.push({
        name: "StopCategoryEditPage",
        params: {
          category: category.title,
        },
      });
    },
    getChartForegroundColor(score) {
      return getColorByNumber(score);
    },
    getChartBackgroundColor(score) {
      return getColorByNumber(score, 0.2);
    },
    handleScore(cat) {
      return cat.questions.some((question) => question.answer === null)
        ? 0
        : cat.score;
    },
  },
  computed: {
    recentAnswers() {
      return this.answers.reduce((acc, answer) => {
        acc[answer.questionId] = [...(acc[answer.questionId] || []), answer];
        return acc;
      }, {});
    },
    answersbyQuestion() {
      return this.questions.map((question) => {
        const answer =
          this.recentAnswers && this.recentAnswers[question.id]
            ? this.recentAnswers[question.id][0]
            : null;
        return {
          ...question,
          answer: answer,
          score: answer && answer.value === "true" ? 1 : 0,
        };
      });
    },
    questionByCategory() {
      return this.categories.map((cat) => {
        const questions = this.answersbyQuestion.filter((question) => {
          return question.categoryId == cat.id;
        });
        const score = questions.reduce((acc, question) => {
          return (acc += question.score);
        }, 0);
        return {
          id: cat.id,
          text: cat.text,
          questions: questions,
          score: parseFloat(((score / questions.length) * 100).toFixed(0)),
        };
      });
    },
  },
};
</script>
