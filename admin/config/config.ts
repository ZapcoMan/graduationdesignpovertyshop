import { defineConfig } from 'umi';

import routes from './routes';

export default defineConfig({
  plugins: ['@umijs/plugins/dist/antd', '@umijs/plugins/dist/request'],
  antd: {},
  request: {},
  routes,
  npmClient: 'npm',
});
