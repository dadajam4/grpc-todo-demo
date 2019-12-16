import { Plugin } from '@nuxt/types';

const plugin: Plugin = async (ctx) => {
  await ctx.store.dispatch('nuxtBrowserInit', ctx);
};

export default plugin;
