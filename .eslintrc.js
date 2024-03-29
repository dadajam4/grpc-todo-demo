module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  // add your custom rules here
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    'require-await': 0,
    'camelcase': 0,
    'prettier/prettier': [
      'error',
      {
        semi: true,
      },
    ],
  }
}
