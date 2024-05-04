import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig(({ mode }) => {
  return {
    build: {
      lib: {
        entry: './src/index.ts',
        formats: ['cjs', 'es'],
        fileName: 'index',
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react-router-dom', '@mui', '@repo/security'],
      },
      sourcemap: true,
      target: 'es2020',
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    base: './',
  };
});
