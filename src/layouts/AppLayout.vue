<template>
  <div class="flex flex-col h-screen overflow-hidden bg-[#FFFBF3]">
    <!-- Header -->
    <header class="bg-blue-500 text-white">
      <div class="container mx-auto py-4 px-6">
        <h1 class="text-xl font-bold cursor-pointer" @click="handleClickHome">{{ title }}</h1>
      </div>
    </header>

    <!-- Contenu principal -->
    <main class="flex-1 overflow-auto container mx-auto p-6">
      <slot></slot> 
    </main>

    <!-- Footer avec menu de navigation -->
    <footer class="bg-gray-100">
      <div class="container mx-auto py-4 px-6 flex justify-between">
        <PrimeButton icon="pi pi-bars" class="p-button-rounded p-button-outlined" />
      </div>
    </footer>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import get from 'lodash/get.js';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'AppLayout',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const state = reactive({
      pageTitle: get(props, 'title'),
    })

    function handleClickHome() {
      router.push('/');
    }

    return {
      ...toRefs(state),
      handleClickHome
    };
  },
});
</script>