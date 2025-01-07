<template>
  <div
    class="object-item"
    :class="shapeClass"
    :style="positionStyle"
  >
    {{ object.weight }}kg
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { ITeeterObject } from '@/helpers/physics';
import { ObjectShape } from '@/enums/ObjectShape';

export default defineComponent({
  name: 'ObjectItem',
  props: {
    object: {
      type: Object as PropType<ITeeterObject>,
      required: true,
    },
  },
  setup(props) {
    const shapeClass = computed(() => {
      switch (props.object.shape) {
        case ObjectShape.TRIANGLE:
          return 'triangle';
        case ObjectShape.CIRCLE:
          return 'circle';
        default:
          return 'rectangle';
      }
    });

    // Dynamically position the object based on x/y
    const positionStyle = computed(() => {
      return {
        left: `${50 + props.object.xPosition * 5}%`,
        top: props.object.yPosition ? `${props.object.yPosition}px` : '50%',
      };
    });

    return {
      shapeClass,
      positionStyle,
    };
  },
});
</script>

<style scoped>
.object-item {
  position: absolute;
  text-align: center;
  cursor: default;
  user-select: none;
  color: #fff;
}
.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f44336;
  line-height: 40px;
}
.rectangle {
  width: 40px;
  height: 40px;
  background-color: #8bc34a;
  line-height: 40px;
}
.triangle {
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 40px solid #ff9800;
  text-indent: -9999px;
}
</style>
