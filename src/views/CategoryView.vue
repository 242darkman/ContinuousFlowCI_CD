<template>
  <div class="container mx-auto px-4 py-5">
    <h2 class="text-3xl font-semibold text-center mb-5 text-gray-800">
      Sélectionnez vos préférences
    </h2>
    <div class="flex flex-wrap md:flex-nowrap">
      <div class="w-full md:w-1/2 px-2">
        <h3 class="text-xl font-semibold mb-3 text-gray-800">
          Sélectionnez une ou plusieurs catégories
        </h3>
        <div class="grid grid-cols-1 gap-4 overflow-auto custom-scrollbar" style="max-height: 300px;">
          <div v-for="category in categories" :key="category.id" class="flex items-center p-4 border rounded-lg">
            <PrimeRadioButton 
              v-model="selectedCategory"
              :value="category" 
              @change="handleChangeCategorySelection"
            />
            <label class="ml-2 text-gray-800" :for="category.id">{{ category.name }}</label>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2 px-2 flex flex-col justify-center">
        <h3 class="text-xl font-semibold mb-3 text-gray-800">
          Sélectionnez le niveau de difficulté
        </h3>
        <PrimeDropdown 
          v-model="selectedDifficulty" 
          @change="handleChangeDifficulty"
          :options="difficulties" 
          optionLabel="name" 
          placeholder="Choisissez un niveau" 
          class="w-full"
        />
      </div>
    </div>
    <div class="mt-4 flex justify-end">
      <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        @click="handleClickStartQuiz"
        v-if="selectedCategory && selectedDifficulty"
      >
        Passer au quiz
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import useGlobalAppStore from '@/stores/globalApp.store.js';

export default defineComponent({
  name: 'CategoryView',
  setup() {
    const globalAppStore = useGlobalAppStore();
    const router = useRouter();
    const state = reactive({
      categories: [],
      selectedCategory: null,
      selectedDifficulty: null,
      difficulties: [
        { name: 'Facile', value: 'easy' },
        { name: 'Moyen', value: 'medium' },
        { name: 'Difficile', value: 'hard' },
      ],
    });

    function handleChangeCategorySelection() {
      globalAppStore.SET_SELECTED_CATEGORY({ category: state.selectedCategory });
    }

    function handleChangeDifficulty() {
      globalAppStore.SET_SELECTED_DIFFICULTY({ difficulty: state.selectedDifficulty });
    }

    function handleClickStartQuiz() {
      router.push('/quizz_game');
    }

    onMounted(async () => {
      state.categories = await globalAppStore.fetchCategories();
    });

    return {
      ...toRefs(state),
      handleChangeCategorySelection,
      handleChangeDifficulty,
      handleClickStartQuiz
    }
  },
})
</script>

<style>
  .custom-scrollbar::-webkit-scrollbar {
    width: 12px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 10px;
  }
</style>