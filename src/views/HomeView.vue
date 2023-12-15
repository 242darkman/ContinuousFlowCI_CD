<template>
  <div class="flex flex-col items-center justify-center h-full w-full" :style="backgroundStyle">
    <h1 class="text-6xl mb-8 text-[#2c3e50]">Bienvenue au Super Quiz!</h1>
    <PrimeButton label="Lancer le Défi" class="p-button-rounded bg-blue-500 text-white border-blue-500 hover:bg-blue-700" @click="chooseCategory" />
  </div>
</template>

<script>
import { defineComponent, computed, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const state = reactive({
      backgroundStyle: computed(() => ({
        backgroundImage: 'url("/images/homepage_quizz_game.png")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        minHeight: '90vh',
      })),
    });

    function chooseCategory() {
      router.push('/categories');
    }

    return {
      ...toRefs(state),
      chooseCategory
    };
  }
})
</script>