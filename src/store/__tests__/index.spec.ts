import { describe, it, expect } from 'vitest';
import store from '@/store';
import { ObjectShape } from '@/enums/ObjectShape';

describe('Vuex Store', () => {
  it('adds a left object', () => {
    const initialLen = store.state.leftObjects.length;
    store.commit('ADD_LEFT_OBJECT', {
      id: 123,
      shape: ObjectShape.CIRCLE,
      weight: 5,
      xPosition: -2,
      yPosition: 0,
    });
    expect(store.state.leftObjects.length).toBe(initialLen + 1);
  });

  it('can pause and resume', () => {
    store.dispatch('pause');
    expect(store.state.paused).toBe(true);

    store.dispatch('resume');
    expect(store.state.paused).toBe(false);
  });
});
