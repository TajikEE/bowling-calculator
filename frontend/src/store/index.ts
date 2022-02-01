import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

type StoreState = {
  rollsInput: number[];
  framesData: any;
  error: boolean;
};
export default new Vuex.Store<StoreState>({
  state: {
    rollsInput: [],
    framesData: { frames: [{ rolls: [0, 0] }], currentFrameIndex: 0, sum: 8 },
    error: false,
  },
  mutations: {
    SET_FRAMES(state, framesData) {
      state.framesData = framesData;
    },

    ADD_ROLLS_INPUT(state, roll: number) {
      state.rollsInput.push(roll);
    },

    SET_ERROR_STATE(state, error) {
      state.error = error;
    },
  },
  actions: {
    async getFrameData({ state, commit }) {
      try {
        commit("SET_ERROR_STATE", false);

        const { data } = await axios.post("/rolls", { rolls: state.rollsInput });

        commit("SET_FRAMES", data);
      } catch (ex) {
        commit("SET_ERROR_STATE", true);
      }
    },

    addRollsInput({ commit }, roll) {
      commit("ADD_ROLLS_INPUT", roll);
    },
  },
  modules: {},
});
