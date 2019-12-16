<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar v-if="needHeader" app color="red" dark dense clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>gRPC TODO</v-toolbar-title>
      <v-spacer />
      <v-menu
        v-if="$store.getters['user/isAuthenticated']"
        bottom
        right
        offset-y
        open-on-hover
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar size="32">
              <img :src="$store.state.user.me.avatar" alt="John" />
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div>Signd in as</div>
            <p class="text--primary">
              {{ $store.state.user.me.name }}
            </p>
            <v-btn block color="info" @click.stop.prevent="logout">
              ログアウト
            </v-btn>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-content>
      <nuxt></nuxt>
    </v-content>

    <transition name="my-loading">
      <div v-if="!initialized" class="my-loading">
        <v-progress-linear
          class="my-loading__progress"
          color="light-blue"
          indeterminate
          rounded
          height="6"
        />
      </div>
    </transition>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component<MyView>({
  watch: {
    $route() {
      this.drawer = false;
    },
  },
})
export default class MyView extends Vue {
  drawer = false;

  get initialized() {
    return this.$store.state.initialized;
  }

  get currentRoutePath() {
    return this.$route.path;
  }

  get needHeader() {
    return !/^\/auth/.test(this.currentRoutePath);
  }

  logout() {
    this.$store.dispatch('user/logout');
  }
}
</script>

<style lang="scss" scoped>
.my-loading {
  position: fixed;
  z-index: 32767;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background: rgba(255, 255, 255, 0.8);

  // &__progress {}
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s;
  }

  &-enter,
  &-leave-active {
    opacity: 0;
  }
}
</style>
