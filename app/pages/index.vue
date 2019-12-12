<template>
  <v-container>
    <h1>Hello</h1>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'nuxt-property-decorator';

@Component<MyView>({})
export default class MyView extends Vue {}
</script>
