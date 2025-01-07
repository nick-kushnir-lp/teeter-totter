<template>
  <div class="control-buttons">
    <AppButton @click="togglePause">
      {{ paused ? 'Resume' : 'Pause' }}
    </AppButton>

    <AppButton @click="toggleAutoMode">
      Auto Mode: {{ autoMode ? 'ON' : 'OFF' }}
    </AppButton>

    <AppButton @click="onRestart">
      Restart
    </AppButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import AppButton from '@/components/atoms/AppButton.vue';

export default defineComponent({
  name: 'ControlButtons',
  components: {
    AppButton,
  },
  setup() {
    const store = useStore();

    const paused = computed(() => store.state.paused);
    const autoMode = computed(() => store.state.autoMode);

    const togglePause = () => {
      if (paused.value) {
        store.dispatch('resume');
      } else {
        store.dispatch('pause');
      }
    };

    const toggleAutoMode = () => {
      store.dispatch('toggleAutoMode');
    };

    const onRestart = () => {
      store.commit('CLEAR_OBJECTS');
      store.dispatch('resume');
    };

    return {
      paused,
      autoMode,
      togglePause,
      toggleAutoMode,
      onRestart,
    };
  },
});
</script>

<style scoped>
.control-buttons {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
</style>
