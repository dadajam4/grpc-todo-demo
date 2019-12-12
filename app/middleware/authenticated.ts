import { Middleware } from '@nuxt/types';

const middleware: Middleware = async (ctx) => {
  await ctx.store.dispatch('user/authcheck', ctx);
};
export default middleware;
