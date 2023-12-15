<template>
  <div class="flex flex-col justify-center items-center">
    <div v-if="questions.length > 0" class="p-4">
      <div>{{ questions[currentQuestionIndex].category }}</div> <!-- Affiche la catégorie de la question actuelle -->
      <div>{{ questions[currentQuestionIndex].question }}</div> <!-- Affiche la question actuelle -->
      <div>
        <PrimeButton 
          v-for="answer in questions[currentQuestionIndex].answers" 
          :key="answer" 
          @click="selectAnswer(questions[currentQuestionIndex], answer)"
        >
          {{ answer }} <!-- Affiche les réponses de la question actuelle -->
        </PrimeButton>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import useGlobalAppStore from '@/stores/globalApp.store.js';
import get from 'lodash/get.js';
import map from 'lodash/map.js';

export default defineComponent({
  name: "GameView",

  setup() {
    const globalAppStore = useGlobalAppStore();
    const state = reactive({
      questions: [],
      currentQuestionIndex: 0,
      selectedCategory: computed(() => globalAppStore.GET_SELECTED_CATEGORY),
      selectedDifficulty: computed(() => globalAppStore.GET_SELECTED_DIFFICULTY),
      score: 0,
      currentTime: 20,
    });

    function formatQuestions({ questions }) {
      return map(questions, (question) => {
        const correctAnswers = get(question, 'correct_answer');
        const incorrectAnswers = get(question, 'incorrect_answers');

        return {
          ...question,
          answers: [correctAnswers, ...incorrectAnswers]
        }
      })
    }

    /* function selectAnswer({ question, selectedAnswer }) {
      goToNextQuestion();
    }

    function handleTimesUp() {
      state.score = 0;
      state.currentTime = 20;
    }

    function goToNextQuestion() {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex++;
      }
    }

    function resetGame() { }

    function getDifficultyFactor(difficulty) {
      switch (difficulty) {
        case "easy": return 1;
        case "medium": return 2;
        case "hard": return 3;
        default: return 1;
      }
    }

    function resetTimer() {
      state.currentTime = 20;
    } */
    
    onMounted(async () => { 
      const selectedCategoryId = get(state.selectedCategory, 'id');
      const selectedDifficulty = get(state.selectedDifficulty, 'value');
      const questions = await globalAppStore.fetchTriviaQuestions({
        category: selectedCategoryId,
        difficulty: selectedDifficulty,
      })
      state.questions = formatQuestions({ questions });
    });

    return {
      ...toRefs(state),
    }
  }
});
</script>