import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    resolve: {
      alias: {
        '@pembukuan/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
      },
    },
    plugins: [
      tailwindcss(),
      react(),
      federation({
        name: 'host_layout',
        remotes: {
          remote_login: env.VITE_REMOTE_LOGIN_URL || 'http://localhost:3001/assets/remoteEntry.js',
        },
        shared: ['react', 'react-dom'],
      }),
    ],
    server: {
      port: 3000,
      strictPort: true,
    },
    preview: {
      port: 3000,
      strictPort: true,
    },
    build: {
      target: 'esnext',
    },
  };
});
