<template>
  <div>
    <div class="mb-4">
      <span>Question {{ currentStep }} of {{ totalSteps }}</span>
    </div>
    <template v-if="question.type == 'yes_no'">
      <YesNoQuestion :question="question" :answer.sync="answer" />
    </template>
    <!-- <template v-if="question.type == 'multiple_choice'">
      <template v-if="question.numAnswers < 0">
        <MultipleChoiceCheckboxQuestion
          :question="question"
          :answer.sync="answer"
        />
      </template>
      <template v-else>
        <MultipleChoiceRadioQuestion
          :question="question"
          :answer.sync="answer"
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
    <!-- </div> -->
  </div>
</template>

<script>
import YesNoQuestion from "@/components/questionTypes/YesNoQuestion.vue";
import MultipleChoiceCheckboxQuestion from "@/components/questionTypes/MultipleChoiceCheckboxQuestion";
import MultipleChoiceRadioQuestion from "@/components/questionTypes/MultipleChoiceRadioQuestion";

export default {
  name: "Step",
  props: {
    currentStep: Number,
    totalSteps: Number,
    question: Object,
    answer: Object,
  },
};
</script>
