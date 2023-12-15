<template>
  <div class="text-2xl">
    {{ timeLeft }}
  </div>
</template>

<script>
import { reactive, onMounted, watch, toRefs } from "vue";
import get from 'lodash/get.js';

export default {
  name: "CountDown",
  props: {
    seconds: {
      type: Number,
      default: 20,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      timeLeft: get(props, 'seconds'),
    });

    onMounted(() => {
      const interval = setInterval(() => {
        if (state.timeLeft <= 0) {
          clearInterval(interval);
          emit('times-up');
          return;
        }
        state.timeLeft -= 1;
      }, 1000);
    });

    watch(() => props.seconds, (newVal) => {
      state.timeLeft = newVal;
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>
