import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createStore, Store } from 'vuex';
import type { StoreOptions } from 'vuex';
import type { RootState } from '@/store';

import HomeView from '@/pages/HomeView.vue';

describe('HomeView.vue', () => {
  let store: Store<RootState>;
  interface TestActions {
    pause: ReturnType<typeof vi.fn>;
    resume: ReturnType<typeof vi.fn>;
    endSimulation: ReturnType<typeof vi.fn>;
    toggleAutoMode?: ReturnType<typeof vi.fn>;
  }

  interface TestMutations {
    ADD_RIGHT_OBJECT: ReturnType<typeof vi.fn>;
    ADD_LEFT_OBJECT: ReturnType<typeof vi.fn>;
    CLEAR_OBJECTS: ReturnType<typeof vi.fn>;
  }

  let state: Partial<RootState>;
  let actions: Partial<TestActions>;
  let mutations: Partial<TestMutations>;

  beforeEach(() => {
    state = {
      paused: false,
      simulationEnded: false,
      autoMode: false,
      leftObjects: [],
      rightObjects: [],
    };
    actions = {
      pause: vi.fn(),
      resume: vi.fn(),
      endSimulation: vi.fn(),
      toggleAutoMode: vi.fn(),
    };
    mutations = {
      ADD_RIGHT_OBJECT: vi.fn(),
      ADD_LEFT_OBJECT: vi.fn(),
      CLEAR_OBJECTS: vi.fn(),
    };
    const storeOptions = {
      state,
      actions,
      mutations,
    } as unknown as StoreOptions<RootState>;

    store = createStore<RootState>(storeOptions);
  });

  it('renders instructions text', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [store],
      },
    });

    expect(wrapper.find('h2').text()).toBe('How to Play');
    expect(wrapper.text()).toContain('Arrow Keys:');
    expect(wrapper.text()).toContain('Auto Mode:');
    expect(wrapper.text()).toContain('Restart:');
  });

  it('dispatches "pause" if paused=false, or "resume" if paused=true when togglePause is called', async () => {
    const wrapper = mount(HomeView, {
      global: { plugins: [store] },
    });

    await (wrapper.vm).togglePause();
    expect(actions.pause).toHaveBeenCalled();
    store.state.paused = true;
    await (wrapper.vm).togglePause();
    expect(actions.resume).toHaveBeenCalled();
  });

  it('togglePause dispatches "pause" if paused = false, or "resume" if paused = true', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [store],
      },
    });
    await (wrapper.vm).togglePause();
    expect(actions.pause).toHaveBeenCalled();
    store.state.paused = true;
    await (wrapper.vm).togglePause();
    expect(actions.resume).toHaveBeenCalled();
  });

  it('spawns right objects periodically if not paused or ended', async () => {
    vi.useFakeTimers();

    mount(HomeView, {
      global: {
        plugins: [store],
      },
    });
    vi.advanceTimersByTime(2100);
    expect(mutations.ADD_RIGHT_OBJECT).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('spawns left objects if autoMode = true', () => {
    store.state.autoMode = true;
    vi.useFakeTimers();

    mount(HomeView, {
      global: {
        plugins: [store],
      },
    });
    vi.advanceTimersByTime(2000);
    expect(mutations.ADD_RIGHT_OBJECT).toHaveBeenCalled();
    expect(mutations.ADD_LEFT_OBJECT).toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('does NOT spawn objects when paused = true or simulationEnded = true', () => {
    store.state.paused = true;
    store.state.simulationEnded = false;

    vi.useFakeTimers();
    mount(HomeView, {
      global: { plugins: [store] },
    });
    vi.advanceTimersByTime(2000);

    expect(mutations.ADD_RIGHT_OBJECT).not.toHaveBeenCalled();
    expect(mutations.ADD_LEFT_OBJECT).not.toHaveBeenCalled();

    vi.useRealTimers();
  });
});
