import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: env.VITE_BASE_URL || 'http://localhost:3001/',
    resolve: {
      alias: {
        '@pembukuan/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
      },
    },
    plugins: [
      tailwindcss(),
      react(),
      federation({
        name: 'remote_login',
        filename: 'remoteEntry.js',
        exposes: {
          './LoginForm': './src/LoginForm.tsx',
        },
        shared: ['react', 'react-dom'],
      }),
    ],
    server: {
      port: 3001,
      strictPort: true,
      cors: true,
    },
    preview: {
      port: 3001,
      strictPort: true,
      cors: true,
    },
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
  };
});
