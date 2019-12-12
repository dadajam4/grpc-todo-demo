const path = require('path');
const fs = require('fs');

const ROOT_DIR = path.resolve(__dirname, '..');
const FUNCTIONS_DIR = path.join(ROOT_DIR, 'functions');
const SOURCE_PATH = path.join(ROOT_DIR, 'package.json');
const TEMPLATE_PATH = path.join(FUNCTIONS_DIR, 'package.template.json');
const DEST_PATH = path.join(FUNCTIONS_DIR, 'package.json');

const source = require(SOURCE_PATH);
const dependencies = source.dependencies;
const template = require(TEMPLATE_PATH);
const json = {
  ...template,
  dependencies: {
    ...template.dependencies,
    ...dependencies,
  },
};
const jsonStr = JSON.stringify(json, null, '  ');
fs.writeFileSync(DEST_PATH, jsonStr, { encoding: 'utf8', flag: 'w' });
