/// <reference types="vitest" />
import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    modules: {
      generateScopedName: '[name]_[local]_[hash:base64:5]'
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/shared.scss";'
      }
    },
    postcss: {
      plugins: [
        autoprefixer({})
      ]
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    alias: {
      '@': resolve(__dirname, './src')
    },
    coverage: {
      provider: 'istanbul'
    },
    css: {
      modules: {
        classNameStrategy: 'non-scoped'
      }
    }
  }
})
