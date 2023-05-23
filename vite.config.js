import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'

const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir)
}

const alias = {
  '@': pathResolve("src")
}
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
        '/api': {
          target : 'http://localhost:5487',
          // target : 'http://rcc.ddb99.vip:18889',
          changeOrigin: true,
          ws: true,
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
