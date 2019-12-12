import { Configuration } from '@nuxt/types';
import { Request, Response } from 'express';
import originalConfig from './.nuxt.config';

const functions = require('firebase-functions');
const express = require('express');
const { Nuxt } = require('nuxt');
const IGNORE_BUILD_MODULES = [
  '@nuxtjs/eslint-module',
  '@nuxt/typescript-build',
];

const app = express();
const config: Configuration = {
  ...originalConfig,
  dev: false,
  buildDir: 'ssr',
};
if (config.buildModules) {
  config.buildModules = config.buildModules.filter((m) => {
    const moduleName = typeof m === 'string' ? m : (m as any)[0];
    return !IGNORE_BUILD_MODULES.includes(moduleName);
  });
}
delete config.server;
const nuxt = new Nuxt(config);
async function handleRequest(req: Request, res: Response) {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  await nuxt.ready();
  return nuxt.render(req, res);
}
app.use(handleRequest);

exports.ssr = functions.https.onRequest(app);
