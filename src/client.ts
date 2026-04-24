import createClient from 'openapi-fetch';
import type { paths } from './schema';

export interface SDKOptions {
  baseUrl: string;
  apiKey?: string;
  token?: string;
  headers?: Record<string, string>;
  fetch?: typeof fetch;
}

export function createSDK(opts: SDKOptions) {
  const client = createClient<paths>({
    baseUrl: opts.baseUrl,
    headers: {
      ...(opts.apiKey ? { 'Api-Key': opts.apiKey } : {}),
      ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}),
      ...(opts.headers ?? {}),
    },
    fetch: opts.fetch,
  });

  return {
    getUserInfo: () => client.GET('/v1/user/info'),
  };
}
