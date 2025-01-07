import { createStore } from 'vuex';
import type { ITeeterObject } from '@/helpers/physics';

export interface RootState {
  leftObjects: ITeeterObject[];
  rightObjects: ITeeterObject[];
  paused: boolean;
  simulationEnded: boolean;
  autoMode: boolean;
}

export default createStore<RootState>({
  state: {
    leftObjects: [],
    rightObjects: [],
    paused: false,
    simulationEnded: false,
    autoMode: false,
  },
  mutations: {
    ADD_LEFT_OBJECT(state, newObj: ITeeterObject) {
      state.leftObjects.push(newObj);
    },
    ADD_RIGHT_OBJECT(state, newObj: ITeeterObject) {
      state.rightObjects.push(newObj);
    },
    SET_PAUSED(state, val: boolean) {
      state.paused = val;
    },
    SET_SIMULATION_ENDED(state, val: boolean) {
      state.simulationEnded = val;
    },
    CLEAR_OBJECTS(state) {
      state.leftObjects = [];
      state.rightObjects = [];
      state.simulationEnded = false;
    },
    SET_AUTO_MODE(state, val: boolean) {
      state.autoMode = val;
    },
  },
  actions: {
    pause({ commit }) {
      commit('SET_PAUSED', true);
    },
    resume({ commit }) {
      commit('SET_PAUSED', false);
    },
    endSimulation({ commit }) {
      commit('SET_SIMULATION_ENDED', true);
    },
    toggleAutoMode({ commit, state }) {
      commit('SET_AUTO_MODE', !state.autoMode);
    },
  },
  getters: {
    totalLeftWeight(state): number {
      return state.leftObjects.reduce((sum, obj) => sum + obj.weight, 0);
    },
    totalRightWeight(state): number {
      return state.rightObjects.reduce((sum, obj) => sum + obj.weight, 0);
    },
  },
});
