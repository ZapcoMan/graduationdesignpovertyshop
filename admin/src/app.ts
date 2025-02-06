import type { RequestConfig } from 'umi';

import { baseURL } from '@/utils';

export const request: RequestConfig = {
  baseURL,
  errorConfig: {
    errorHandler() {},
    errorThrower() {},
  },
  requestInterceptors: [
    (url, options: any) => {
      const token = localStorage.getItem('token');
      const _options = {
        ...options,
        headers: {
          ...options.headers,
          token,
        },
      };
      return { url, options: _options };
    },
  ],
  responseInterceptors: [],
};
