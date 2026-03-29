import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const buildOptions = {
    lib: {
      entry: path.resolve(__dirname, 'src', 'main.ts'),
      name: 'frontend-ui',
      fileName: (format: string) => `frontend-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router-dom', '@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM',
          '@mui/material': 'MaterialUI',
          '@mui/icons-material': 'MaterialUIIcons',
          '@emotion/react': 'EmotionReact',
          '@emotion/styled': 'EmotionStyled',
        },
      },
    },
  };

  return {
    base: './',
    build: buildOptions,
    plugins: [react(), svgr()],
    resolve: {
      alias: {
      },
    },
  };
});
