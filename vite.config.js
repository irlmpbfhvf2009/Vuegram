import vue from '@vitejs/plugin-vue'
// import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'

const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir)
}

const alias = {
  '@': pathResolve("src")
}
// export default defineConfig => {
export default ({ command }) => {
  const prodMock = true;
  return {
    base: './',
    resolve: {
      alias
    },
    server: {
      host: "0.0.0.0",
      prot: 3002,
      open: false,
      https: false,
      proxy: { // 代理配置
        '/app': {
          target : 'http://localhost:8888',
          // target : 'http://rcc.ddb99.vip:18889',
          changeOrigin: true,
          ws: true,
          // rewrite: (path) => path.replace(/^\/dev-api/,'')
        }
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            
          }
        }
      }
    },
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && prodMock,
        watchFiles: true,
        injectCode: `
          import { setupProdMockServer } from '../mockProdServer';
          setupProdMockServer();
        `,
        logger: true,
      }),
    ]
  };
}
