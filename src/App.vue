<template>
  <div>
    <h1>Insider’s Teeter Totter</h1>
    <HomeView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HomeView from '@/pages/HomeView.vue';

export default defineComponent({
  name: 'App',
  components: {
    HomeView,
  },
});
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 1rem;
}
</style>
