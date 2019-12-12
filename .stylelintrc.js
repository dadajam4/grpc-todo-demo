module.exports = {
  'plugins': [
    'stylelint-scss'
  ],
  'extends': [
    'stylelint-config-standard',
    'stylelint-config-prettier'
  ],
  'rules': {
    'indentation': 2,
    'string-quotes': 'single',
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
  }
};
