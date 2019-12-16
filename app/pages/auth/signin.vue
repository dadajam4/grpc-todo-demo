<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-form>
          <v-card class="elevation-12">
            <v-card-text>
              <v-btn
                block
                color="secondary"
                type="button"
                @click.prevent="signInWithGoogle"
              >
                Sign in with Google
                <v-icon right>mdi-google</v-icon>
              </v-btn>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';
import firebaseApp, { googleProvider } from '~/firebase/app';

@Component({
  fetch(ctx) {
    if (ctx.store.getters['user/isAuthenticated']) {
      ctx.redirect('/');
    }
  },
})
export default class MyView extends Vue {
  async signInWithGoogle() {
    await firebaseApp.auth().signInWithRedirect(googleProvider);
    // try {
    //   const { user } = await firebaseApp.auth().signInWithPopup(googleProvider);
    //   await this.$store.dispatch('user/login', user);
    // } catch (err) {
    //   // eslint-disable-next-line no-console
    //   console.warn('sign in failed', err);
    // }
  }
}
</script>
