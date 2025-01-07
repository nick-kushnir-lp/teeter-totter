<template>
  <div class="teeter-totter-container">
    <ObjectItem
      v-for="obj in leftObjects"
      :key="obj.id"
      :object="obj"
    />
    <ObjectItem
      v-for="obj in rightObjects"
      :key="obj.id"
      :object="obj"
    />
    <div
      class="bar"
      :style="barStyle"
    >
    </div>
    <div class="pivot"></div>

    <div class="stats left-stats">
      <p>Total Weight (Left): {{ totalLeftWeight }} kg</p>
    </div>
    <div class="stats right-stats">
      <p>Total Weight (Right): {{ totalRightWeight }} kg</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import ObjectItem from '@/components/molecules/ObjectItem.vue';
import { torqueDifference, computeBendingPercentage, ITeeterObject } from '@/helpers/physics';
import { TEETER_WIDTH, MAX_TORQUE_DIFFERENCE } from '@/constants/teeterConstants';

export default defineComponent({
  name: 'TeeterTotter',
  components: {
    ObjectItem,
  },
  setup() {
    const store = useStore();

    const leftObjects = computed<ITeeterObject[]>(() => store.state.leftObjects);
    const rightObjects = computed<ITeeterObject[]>(() => store.state.rightObjects);

    const totalLeftWeight = computed(() => store.getters.totalLeftWeight);
    const totalRightWeight = computed(() => store.getters.totalRightWeight);

    // If difference or angle goes beyond limits, end simulation
    const checkEndCondition = () => {
      const td = torqueDifference(leftObjects.value, rightObjects.value);
      // immediate end
      if (Math.abs(td) > MAX_TORQUE_DIFFERENCE) {
        store.dispatch('endSimulation');
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (store.state.paused || store.state.simulationEnded) return;
      if (leftObjects.value.length > 0) {
        const lastObj = leftObjects.value[leftObjects.value.length - 1];
        if (e.key === 'ArrowLeft') {
          lastObj.xPosition = Math.max(-TEETER_WIDTH / 2, lastObj.xPosition - 0.5);
        } else if (e.key === 'ArrowRight') {
          lastObj.xPosition = Math.min(0, lastObj.xPosition + 0.5);
        }
      }
      checkEndCondition();
    };

    onMounted(() => {
      window.addEventListener('keydown', onKeyDown);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', onKeyDown);
    });

    // Calculate the bar's rotation from torque difference
    const barStyle = computed(() => {
      const td = torqueDifference(leftObjects.value, rightObjects.value);
      const bend = computeBendingPercentage(td); // -0.3 to 0.3
      const deg = bend * 10; // e.g., ±3 degrees at max
      return {
        transform: `rotate(${-deg}deg)`,
      };
    });

    return {
      leftObjects,
      rightObjects,
      totalLeftWeight,
      totalRightWeight,
      barStyle,
    };
  },
});
</script>

<style scoped>
.teeter-totter-container {
  position: relative;
  width: 100%;
  height: 600px;
  border: 1px solid #ccc;
  overflow: hidden;
  margin: 0 auto;
}

.bar {
  position: relative;
  top: 48%;
  left: 0;
  height: 4px;
  background-color: brown;
  transform-origin: center center;
  width: 80%;
  margin: 0 auto;
}

.pivot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 20px solid #666;
  transform: translate(-50%, -50%);
}

.stats {
  position: absolute;
  top: 10px;
  padding: 0.5rem;
  background-color: #fff;
  border: 1px solid #ccc;
}
.left-stats {
  left: 20px;
}
.right-stats {
  right: 20px;
}
</style>
