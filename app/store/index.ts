import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { Context } from '@nuxt/types';

export interface State {
  initialized: boolean;
}

export const state = (): State => ({
  initialized: false,
});

export const getters: GetterTree<State, State> = {};

export const actions: ActionTree<State, State> = {
  async nuxtServerInit({ dispatch, commit }, ctx: Context) {
    await dispatch('user/serverInit', ctx);
    // await dispatch('language/serverInit', ctx);
    // await Promise.all([
    //   dispatch('commons/serverInit', ctx),
    //   dispatch('hotel/serverInit', ctx),
    // ]);
  },
  async nuxtBrowserInit({ dispatch, commit }, ctx: Context) {
    await dispatch('user/browserInit', ctx);
    setTimeout(() => {
      commit('SET_INITIALIZED', true);
    }, 0);
    // (window as any).$nuxt.$nextTick(() => {
    //   commit('SET_INITIALIZED', true);
    // });
  },
};

export const mutations: MutationTree<State> = {
  SET_INITIALIZED(state, initialized: boolean) {
    state.initialized = initialized;
  },
};
