import { URL, fileURLToPath } from 'node:url';
// eslint-disable-next-line import/no-extraneous-dependencies
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)', 'tests/**/*.{test,spec}.?(c|m)[jt]s?(x)']
    }
  })
)
