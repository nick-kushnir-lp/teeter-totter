<template>
  <button class="app-button" @click="onClick">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppButton',
  emits: ['click'],
  setup(props, { emit }) {
    const onClick = () => {
      emit('click');
    };
    return { onClick };
  },
});
</script>

<style scoped>
.app-button {
  padding: 0.5rem 1rem;
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.app-button:hover {
  background-color: #004c99;
}
</style>
