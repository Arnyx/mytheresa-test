/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src/client/styles'),
      '@assets': path.resolve(__dirname, 'src/client/assets'),
      '@features': path.resolve(__dirname, 'src/client/features'),
      '@shared': path.resolve(__dirname, 'src/client/shared'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/client/styles/core.scss" as *;`,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'dist/',
        'node_modules/',
        'src/vitest.setup.ts',
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/config/theme.ts',
        'eslint.config.js',
        'vite.config.ts',
        '**/*.d.ts',
        '**/mocks.ts',
      ],
    },
  },
});
