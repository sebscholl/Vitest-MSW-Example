import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [vue()],
    base: './',
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: './test/setup.js',
        include: ['./test/**/*.spec.js'],
    },
    resolve: {
        alias: [
            {
                find: '@src',
                replacement: path.resolve(__dirname, 'src')
            },
            {
                find: '@test',
                replacement: path.resolve(__dirname, 'test')
            }
        ]
    }
})