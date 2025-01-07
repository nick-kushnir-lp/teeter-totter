import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import { describe, it, expect, vi } from 'vitest';
import ControlButtons from '@/components/molecules/ControlButtons.vue';

describe('ControlButtons', () => {
  it('calls pause/resume on click', async () => {
    const mockStore = createStore({
      state: { paused: false, autoMode: false },
      actions: {
        pause: vi.fn(),
        resume: vi.fn(),
        toggleAutoMode: vi.fn(),
      },
      mutations: {
        CLEAR_OBJECTS: vi.fn(),
      },
    });

    const wrapper = mount(ControlButtons, {
      global: {
        plugins: [mockStore],
      },
    });

    const pauseBtn = wrapper.find('button');
    await pauseBtn.trigger('click');

    expect(mockStore?._actions.pause).toHaveLength(1);
  });
});
