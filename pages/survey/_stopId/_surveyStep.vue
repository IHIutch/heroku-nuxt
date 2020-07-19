<template>
  <div>
    {{ question }}
    <!-- <template v-if="question.questionType == 'yes_no'">
          <YesNoQuestion
            :question="question"
            :answer.sync="answers[idx]"
            :index="idx"
          />
        </template>
        <template v-if="question.questionType == 'multiple_choice'">
          <template v-if="question.numAnswers < 0">
            <MultipleChoiceCheckboxQuestion
              :question="question"
              :answer.sync="answers[idx]"
              :index="idx"
            />
          </template>
          <template v-else>
            <MultipleChoiceRadioQuestion
              :question="question"
              :answer.sync="answers[idx]"
              :index="idx"
            />
          </template>
        </template> -->

    <!-- <div v-if="currentQuestion > -1">
      <b-button class="mb-2" @click="toggleComments(currentQuestion)">
        <span v-if="!answers[currentQuestion].showComment"
          >Add Comments</span
        >
        <span v-else>Hide Comments</span>
      </b-button>
      <div v-if="answers[currentQuestion].showComment">
        <b-form-textarea
          v-model="answers[currentQuestion].comment"
          placeholder="Enter something..."
          rows="3"
          max-rows="8"
          no-auto-shrink
        ></b-form-textarea>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "SurveyStep",
  props: {
    question: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped></style>
