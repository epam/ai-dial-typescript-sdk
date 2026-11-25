import type { SdkClient } from './reference-types';

/** The SDK's clients, each with its own reference under `basePath`. */
export const clients: Record<SdkClient, { label: string; basePath: string }> = {
  core: { label: 'DIAL Core', basePath: '/api' },
  analytics: { label: 'DIAL Analytics', basePath: '/analytics/api' },
};
