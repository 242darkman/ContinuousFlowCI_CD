<template>
  <AppLayout :title="title">
    <main>
      <RouterView />
    </main>
  </AppLayout>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import AppLayout from '@/layouts/AppLayout.vue';

export default defineComponent({
  components: {
    AppLayout,
  },
  setup() {
    const state = reactive({
      title: "QuizMania: Le Défi des Esprits Curieux",
    })

    return {
      ...toRefs(state),
    };
  },
});
</script>