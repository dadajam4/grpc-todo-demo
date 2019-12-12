import { GetterTree, ActionTree, MutationTree } from 'vuex';
import { Context } from '@nuxt/types';
import jwtDecode from 'jwt-decode';
import { State as RootState } from './';
import firebaseApp from '~/firebase/app';

export interface User {
  name: firebase.User['displayName'];
  email: firebase.User['email'];
  avatar: firebase.User['photoURL'];
  uid: firebase.User['uid'];
}

export interface State {
  // uid: User['uid'] | null;
  me: User | null;
}

export const state = (): State => ({
  me: null,
});

export const getters: GetterTree<State, RootState> = {
  uid(state) {
    if (state.me && state.me.uid) return state.me.uid;
    else return null;
  },
  isAuthenticated(state) {
    return !!state.me;
  },
};

export const actions: ActionTree<State, RootState> = {
  async serverInit({ dispatch }) {
    await dispatch('restoreUserFromCookie');
  },
  authcheck({ getters }, ctx: Context) {
    const { route, redirect } = ctx;
    if (!/^\/auth/.test(route.path) && !getters.isAuthenticated) {
      /**
       * @todo: firebaseでは「__session」以外のキーは保存できないのでなんとかする
       */
      // this.$cookies.set('auth_redirect_for', route.fullPath, { path: '/' });
      return redirect('/auth/signin');
    }
  },
  async restoreUserFromCookie({ commit }) {
    let me: User | null = null;
    const access_token = this.$cookies.get('__session');
    if (access_token) {
      const decoded = jwtDecode(access_token) || null;
      if (decoded) {
        me = {
          name: decoded.name,
          email: decoded.email,
          avatar: decoded.picture,
          uid: decoded.user_id,
        };
      }
    }
    commit('SET_ME', me);
  },
  setMe({ commit }, me: User) {
    commit('SET_ME', me);
  },
  async login({ commit, state }, user) {
    const { currentUser } = firebaseApp.auth();
    if (!currentUser) {
      throw new Error('missing currentUser');
    }
    const token = await currentUser.getIdToken(true);
    const me: User = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      uid: user.uid,
    };
    this.$cookies.set('__session', token, { path: '/' });
    commit('SET_ME', me);

    /**
     * @todo: firebaseでは「__session」以外のキーは保存できないのでなんとかする
     */
    // const auth_redirect_for = this.$cookies.get('auth_redirect_for') || '/';
    const auth_redirect_for = '/';
    // this.$cookies.remove('auth_redirect_for');
    this.$router.replace(auth_redirect_for);
  },
  // ログアウト処理
  async logout({ commit }) {
    await firebaseApp.auth().signOut();
    this.$cookies.remove('__session');
    commit('SET_ME', null);
    location.reload();
  },
};

export const mutations: MutationTree<State> = {
  SET_ME(state, me: User | null) {
    state.me = me;
  },
};
