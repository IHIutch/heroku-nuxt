<template>
  <b-container class="py-5">
    <b-row>
      <b-col cols="8" offset="2">
        <div class="mb-5">
          <div class="d-flex align-items-center justify-content-between">
            <h1>{{ stop.stopName }}</h1>
            <b-button variant="primary" size="sm">Take Survey</b-button>
          </div>
          <div>
            <span class="mr-3">Stop Code: {{ stop.stopCode }}</span>
            <span class="text-muted">
              Coords: {{ stop.stopLat }}, {{ stop.stopLon }}
            </span>
          </div>
        </div>
        <!-- <b-row>
          <b-col v-for="(cat, idx) in questionByCategory" :key="idx">
            <div class="text-center mb-5">
              <DoughnutChartWrapper
                :foregroundColor="getChartForegroundColor(cat.score)"
                :backgroundColor="getChartBackgroundColor(cat.score)"
                :percent="cat.score"
                :thickness="20"
              >
                <div class="mx-auto">
                  <div class="mb-3">
                    <span class="h1">{{ cat.score }}</span>
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
                          <span v-if="getResult()">
                            <b-badge variant="success">True</b-badge>
                          </span>
                          <span v-else>
                            <b-badge variant="danger">False</b-badge>
                          </span>
                        </div>
                        <div>
                          <span>
                            <chevron-down-icon size="1.5x" />
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
        </b-row> -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { getMeta } from "@/functions/index";

export default {
  name: "StopPage",
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
      .$get(`/stops/${stopId}`)
      .then((res) => {
        if (res) return { stop: res, currentRoute: env.baseUrl + route.path };
        else throw new Error();
      })
      .catch((err) => {
        error({ statusCode: 404, message: "Stop not found" });
      });
  },
  methods: {
    getResult() {
      return Math.random() < 0.5;
    },
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
  },
};
</script>
