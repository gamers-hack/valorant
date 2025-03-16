// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  srcDir: 'src/',
  components: false,
  imports: {
    autoImport: false,
  },
  css: ['normalize.css', 'the-new-css-reset', '@/assets/style/global.scss'],
  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        paths: {
          '@': ['src'],
          '@/*': ['src/*'],
          '#hooks/*': ['../src/hooks/*'],
        },
      },
    },
  },
});
