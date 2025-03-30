import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { defineConfig } from 'vite'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: [
//       {
//         find: '@',
//         replacement: '/src'
//       }
//     ]
//   }
// })

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'

  return {
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()],
      },
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      // Production optimizations
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isProd,
          drop_debugger: isProd,
        },
      },
      // Split chunks for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': [
              'vue',
              'vue-router',
              'pinia',
              '@vueuse/core',
              '@vueuse/head'
            ],
            'ui': [
              'radix-vue',
              'shadcn-vue',
              'lucide-vue-next'
            ]
          }
        }
      }
    },
    server: {
      port: 3000,
      open: true
    }
  }
})
