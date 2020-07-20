<template>
  <b-container class="mt-12">
    <b-row>
      <b-col cols="10" offset="1">
        <div class="mb-12">
          <div class="d-flex justify-content-between">
            <h1>Categories</h1>
            <div>
              <b-button v-b-modal.catModal>New Category</b-button>
            </div>
          </div>
          <b-table
            :items="categories"
            :fields="['id', 'text', 'created']"
            sort-by="id"
          >
            <template v-slot:cell(created)="data">
              {{ data.item.createdAt | dayjs("MM/DD/YY, hh:mmA") }}
            </template>
          </b-table>
        </div>
        <div>
          <div class="d-flex justify-content-between">
            <h1>Questions</h1>
            <div>
              <b-button v-b-modal.questionModal>New Question</b-button>
            </div>
          </div>
          <b-table
            :items="computedQuestions"
            :fields="['id', 'text', 'category', 'type', 'active', 'created']"
            sort-by="id"
          >
            <template v-slot:cell(category)="data">
              {{ data.item.category.text }}
            </template>
            <template v-slot:cell(created)="data">
              {{ data.item.createdAt | dayjs("MM/DD/YY, hh:mmA") }}
            </template>
          </b-table>
        </div>
      </b-col>
    </b-row>

    <b-modal hide-footer id="catModal" title="Add New Category">
      <b-form-group id="catNameLabel" label="Category Name" label-for="catName">
        <b-form-input
          id="catName"
          v-model="newCategory.text"
          type="text"
          required
          placeholder="Category Name"
        ></b-form-input>
      </b-form-group>
      <b-button variant="primary" @click="createCategory()" :disabled="isSaving"
        >Create</b-button
      >
    </b-modal>
    <b-modal hide-footer id="questionModal" title="Add New Question">
      <b-form-group
        id="questionTextLabel"
        label="Question"
        label-for="questionText"
      >
        <b-form-input
          id="questionText"
          v-model="newQuestion.text"
          type="text"
          required
          placeholder="Write a Question"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="questionCatLabel"
        label="Question Category"
        label-for="questionCat"
      >
        <b-form-select
          id="questionCat"
          v-model="newQuestion.categoryId"
          required
        >
          <option :value="null" disabled>-- Please Select a Category --</option>
          <option v-for="(cat, idx) in categories" :key="idx" :value="cat.id">
            {{ cat.text }}
          </option>
        </b-form-select>
      </b-form-group>
      <b-form-group
        id="questionTypeLabel"
        label="Question Type"
        label-for="questionType"
      >
        <b-form-select
          id="questionType"
          v-model="newQuestion.type"
          :options="questionTypes"
          required
        >
          <template v-slot:first>
            <option :value="null" disabled>-- Please Select an Type --</option>
          </template>
        </b-form-select>
      </b-form-group>
      <template v-if="newQuestion.type == 'multiple_choice'">
        <div>
          <b-form-group label="Answer Type">
            <b-form-radio-group
              id="numAnswers"
              name="numAnswers"
              v-model="newQuestion.numAnswers"
            >
              <b-form-radio value="1">Select One Answer</b-form-radio>
              <b-form-radio value="-1">Select Multiple Answers</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
          <b-form-group
            v-for="(answer, idx) in newQuestion.answers"
            :key="idx"
            :id="'answerTextLabel-' + idx"
            :label="'Answer ' + (idx + 1)"
            :label-for="'answerText-' + idx"
          >
            <b-form-input
              :id="'answerText-' + idx"
              type="text"
              required
              placeholder="Answer"
              v-model="newQuestion.answers[idx].text"
            ></b-form-input>
          </b-form-group>
          <b-button variant="primary" @click="addAnswer()">Add Answer</b-button>
        </div>
      </template>
      <template v-else-if="newQuestion.type == 'range'">
        <b-row>
          <b-col cols="12">
            <b-form-group id="stepsLabel" label="Steps" label-for="steps">
              <b-form-select id="steps" :options="steps" required>
                <template v-slot:first>
                  <option :value="null" disabled>-- Number of Steps --</option>
                </template>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              id="lowLabelLabel"
              label="Low Label"
              label-for="lowLabel"
            >
              <b-form-input
                id="lowLabel"
                type="text"
                required
                placeholder="Low Label"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6">
            <b-form-group
              id="highLabelLabel"
              label="High Label"
              label-for="highLabel"
            >
              <b-form-input
                id="highLabel"
                type="text"
                required
                placeholder="High Label"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </template>
      <template v-else-if="newQuestion.type == 'yes_no'">
        <b-form-group
          id="yesNoLabelsLabel"
          label="Labels"
          label-for="yesNoLabels"
        >
          <b-form-select
            id="yesNoLabels"
            v-model="newQuestion.answers"
            required
          >
            <option :value="[]" disabled selected
              >-- Choose an Option --</option
            >
            <option
              :value="[
                { text: 'Yes', value: true },
                { text: 'No', value: false },
              ]"
              >Yes/No</option
            >
            <option
              :value="[
                { text: 'True', value: true },
                { text: 'False', value: false },
              ]"
              >True/False</option
            >
          </b-form-select>
        </b-form-group>
      </template>
      <b-button variant="primary" @click="createQuestion()">Create</b-button>
    </b-modal>
  </b-container>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "AdminHome",
  layout: "admin",
  async asyncData({ $axios, error }) {
    return $axios
      .$get(`${$axios.defaults.baseURL}/admin`)
      .then((res) => {
        if (res) {
          const [questions, categories] = res;
          return {
            questions,
            categories,
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
      isSaving: false,
      newCategory: {
        text: "",
      },
      newQuestion: {
        text: "",
        type: null,
        categoryId: null,
        answers: [],
        highLabel: null,
        lowLabel: null,
        steps: null,
        numAnswers: null,
        boolLabels: {},
      },
      questionTypes: [
        { text: "Multiple Choice", value: "multiple_choice" },
        { text: "Yes/No", value: "yes_no" },
        { text: "Range", value: "range" },
        { text: "Text", value: "text" },
        { text: "Number", value: "number" },
      ],
      categories: [],
      questions: [],
      steps: [3, 4, 5],
    };
  },
  methods: {
    addAnswer() {
      this.newQuestion.answers.push({
        text: "",
      });
    },
    createCategory() {
      this.isSaving = true;
      this.$axios
        .$post(`${this.$axios.defaults.baseURL}/categories/create`, {
          text: this.newCategory.text,
          value: this.newCategory.text.replace(/\s+/g, "-").toLowerCase(),
        })
        .then((data) => {
          this.categories.push(data);
          this.$bvModal.hide("catModal");
          this.newCategory = {
            text: "",
          };
          this.isSaving = false;
        })
        .catch((err) => console.log(err));
    },
    createQuestion() {
      this.isSaving = true;
      this.$axios
        .$post(`${this.$axios.defaults.baseURL}/questions/create`, {
          text: this.newQuestion.text,
          type: this.newQuestion.type,
          answers: this.newQuestion.answers,
          categoryId: this.newQuestion.categoryId,
        })
        .then((data) => {
          this.questions.push(data);
          this.$bvModal.hide("questionModal");
          this.isSaving = false;
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {
    computedQuestions() {
      return this.questions.map((question) => {
        const category = this.categories.find((cat) => {
          return question.categoryId === cat.id;
        });
        return {
          category,
          ...question,
        };
      });
    },
  },
  filters: {
    dayjs(val, format) {
      return dayjs(val).format(format);
    },
  },
};
</script>
