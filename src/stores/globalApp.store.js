import axios from 'axios';
import { defineStore } from 'pinia';
import get from 'lodash/get.js';

const getters = {
  GET_CATEGORIES: (state) => state.categories,
  GET_SELECTED_CATEGORY: (state) => state.selectedCategory,
  GET_SELECTED_DIFFICULTY: (state) => state.selectedDifficulty,
};

const actions = {
  /**
   * Récupère les catégories depuis l'API Open Trivia.
   * Met à jour l'état `categories` avec les données récupérées.
   */
  async fetchCategories() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_OPENTRIVIA_DB_URL}/api_category.php`);
        const categories = get(response, 'data.trivia_categories');
        this.categories = categories;

        return categories;
      } catch (error) {
        throw new Error(`Error fetching categories from Open Trivia: ${error}`);
      }
  },

/**
 * Récupère des questions de trivia à partir de l'API Open Trivia.
 *
 * @param {Object} options - Les options de recherche de questions.
 * @param {number} options.categoryId - L'ID de la catégorie pour les questions.
 * @param {string} options.difficulty - Le niveau de difficulté des questions.
 * @return {Array} Un ensemble de questions.
 */
  async fetchTriviaQuestions({categoryId, difficulty}) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_OPENTRIVIA_DB_URL}/api.php`, {
        params: {
          amount: 10,
          category: categoryId,
          difficulty,
        }
      });

      const questions = get(response, 'data.results');
      this.questions = questions;

      return questions;
    } catch (error) {
      throw new Error(`Error retrieving questions from Open Trivia: ${error}`);
    }
  },
  
  SET_SELECTED_CATEGORY({ category }){
    this.selectedCategory = category;
  },

  SET_SELECTED_DIFFICULTY ({ difficulty }){
    this.selectedDifficulty = difficulty;
  }

};

const state = {
  categories: [],
  selectedCategory: {},
  selectedDifficulty: {},
  questions: [],
};

const useGlobalAppStore = defineStore('globalApp', {
  state: () => (state),
  actions,
  getters
});

export default useGlobalAppStore;