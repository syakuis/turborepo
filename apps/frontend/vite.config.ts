import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = Number.parseInt(env.VITE_PORT) || 5173;

  console.log(`Server is running on port ${port}, environment: ${env.NODE_ENV}`);

  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: 'default',
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: '**/*.svg',
      }),
    ],
    server: {
      port,
      proxy: {
        '/web-crawler/apis': {
          target: env.VITE_WEB_CRAWLER_API_HOST,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/web-crawler-api/, ''),
        },
      },
    },
  };
});
