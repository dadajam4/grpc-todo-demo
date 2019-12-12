import { Configuration } from '@nuxt/types';

const nuxtConfig: Configuration = {
  mode: 'universal',
  srcDir: 'app',
  server: {
    host: '0.0.0.0',
  },
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
  ],
  modules: ['cookie-universal-nuxt'],

  router: {
    middleware: ['authenticated'],
  },
  serverMiddleware: [{ path: '/api', handler: '~/api/index.js' }],

  /**
   * Build configuration
   */
  build: {
    extend(config, ctx) {
      if (!config.module) {
        throw new Error('NuxtのWebPack設定がおかしいです');
      }

      config.devtool = 'source-map';

      // Run lint on save
      if (/* ctx.isDev && */ ctx.isClient) {
        // eslint
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }

      if (ctx.isServer) {
        config.externals = {
          'firebase/app': 'commonjs firebase/app',
          'firebase/auth': 'commonjs firebase/auth',
          'firebase/firestore': 'commonjs firebase/firestore',
        };
      }
    },
  },
};

export default nuxtConfig;
