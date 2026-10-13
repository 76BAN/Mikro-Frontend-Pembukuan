import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@pembukuan/ui': path.resolve(__dirname, './packages/ui/src/index.ts'),
      'remote_login/LoginForm': path.resolve(__dirname, './apps/remote-login/src/LoginForm.tsx'),
      'remote_dashboard/Dashboard': path.resolve(__dirname,'./apps/remote-dashboard/src/Dashboard.tsx'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test.setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
});
