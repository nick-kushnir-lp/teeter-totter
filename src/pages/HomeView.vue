<template>
  <div>
    <div class="instructions">
      <h2>How to Play</h2>
      <ul>
        <li>
          <strong>Arrow Keys:</strong> Move the last spawned object on the left side horizontally.
        </li>
        <li>
          <strong>Pause/Resume:</strong> Temporarily freeze or continue the simulation.
        </li>
        <li>
          <strong>Auto Mode:</strong> Automatically spawn objects on the left side as well.
        </li>
        <li>
          <strong>Restart:</strong> Clear all objects and start fresh.
        </li>
      </ul>
    </div>

    <ControlButtons />
    <TeeterTotter />
    <div v-if="store.state.simulationEnded" class="end-overlay">
      <h2>Simulation Ended</h2>
      <p>Bending or torque difference exceeded the limit!</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useStore } from 'vuex';
import TeeterTotter from '../components/organisms/TeeterTotter.vue';
import { ObjectShape } from '@/enums/ObjectShape';
import type { ITeeterObject } from '@/helpers/physics';
import ControlButtons from '@/components/molecules/ControlButtons.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    ControlButtons,
    TeeterTotter,
  },
  setup() {
    const store = useStore();

    const spawnRightObject = () => {
      const shapes = Object.values(ObjectShape);
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const weight = Math.floor(Math.random() * 10) + 1; // 1-10
      const xPos = Math.random() * 5 + 0.5;
      const newObj: ITeeterObject = {
        id: Date.now() + Math.random(),
        shape,
        weight,
        xPosition: xPos,
        yPosition: 250,
      };
      store.commit('ADD_RIGHT_OBJECT', newObj);
    };

    const spawnLeftObject = () => {
      const shapes = Object.values(ObjectShape);
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const weight = Math.floor(Math.random() * 10) + 1; // 1-10
      // random x between -5 and 0
      const xPos = -(Math.random() * 5);
      const newObj: ITeeterObject = {
        id: Date.now() + Math.random(),
        shape,
        weight,
        xPosition: xPos,
        yPosition: 250,
      };
      store.commit('ADD_LEFT_OBJECT', newObj);
    };
    let spawnerInterval: number;

    const startSpawning = () => {
      spawnerInterval = window.setInterval(() => {
        if (!store.state.paused && !store.state.simulationEnded) {
          // Always spawn right side
          spawnRightObject();
          // also spawn left side if automatically
          if (store.state.autoMode) {
            spawnLeftObject();
          }
        }
      }, 2000);
    };

    const stopSpawning = () => {
      if (spawnerInterval) {
        clearInterval(spawnerInterval);
      }
    };

    onMounted(() => {
      startSpawning();
    });

    const togglePause = () => {
      if (store.state.paused) {
        store.dispatch('resume');
      } else {
        store.dispatch('pause');
      }
    };

    const restart = () => {
      stopSpawning();
      store.commit('CLEAR_OBJECTS');
      store.dispatch('resume');
      startSpawning();
    };

    return {
      store,
      togglePause,
      restart,
    };
  },
});
</script>

<style scoped>
.instructions {
  margin: 1rem auto;
  padding: 1rem;
  max-width: 600px;
  border: 1px dashed #ccc;
  background-color: #fafafa;
}

.instructions h2 {
  margin-top: 0;
}

.instructions ul {
  margin: 0;
  padding-left: 1.5rem;
}

.end-overlay {
  position: absolute;
  top: 400px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 0, 0, 0.1);
  padding: 2rem;
  border: 2px solid red;
  text-align: center;
}
</style>
