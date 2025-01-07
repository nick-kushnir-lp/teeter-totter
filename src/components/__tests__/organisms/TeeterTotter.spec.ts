import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { describe, it, expect, vi } from 'vitest';
import TeeterTotter from '@/components/organisms/TeeterTotter.vue';

describe('TeeterTotter', () => {
  it('renders left/right weights from getters', () => {
    const mockStore = createStore({
      state: {
        leftObjects: [{ id: 1, weight: 5, shape: 'circle', xPosition: -2, yPosition: 50 }],
        rightObjects: [{ id: 2, weight: 3, shape: 'rectangle', xPosition: 3, yPosition: 300 }],
        paused: false,
        simulationEnded: false,
        autoMode: false,
      },
      getters: {
        totalLeftWeight: () => 5,
        totalRightWeight: () => 3,
      },
      actions: { endSimulation: vi.fn() },
    });

    const wrapper = mount(TeeterTotter, {
      global: { plugins: [mockStore] },
    });

    expect(wrapper.text()).toContain('Total Weight (Left): 5 kg');
    expect(wrapper.text()).toContain('Total Weight (Right): 3 kg');
  });
});
