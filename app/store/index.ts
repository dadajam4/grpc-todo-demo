import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { Context } from '@nuxt/types';

export interface State {}

export const state = (): State => ({});

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
  async nuxtClientInit({ dispatch }, ctx: Context) {
    // await dispatch('language/clientInit', ctx);
  },
};

export const mutations: MutationTree<State> = {};
