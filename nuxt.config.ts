// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';
// import { NodePackageImporter } from 'sass-embedded';

export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  srcDir: 'src/',
  components: false,
  imports: {
    autoImport: true,
    dirs: [],
  },
  experimental: {
    componentIslands: false,
    typedPages: true,
  },
  vue: {
    compilerOptions: {
      isCustomElement: _tag => false,
      whitespace: 'preserve',
    },
  },
  css: ['normalize.css', 'the-new-css-reset', '@/assets/style/global.scss'],
  typescript: {
    strict: true,
    typeCheck: true,
    shim: false,
    tsConfig: {
      compilerOptions: {
        paths: {
          '@': ['src'],
          '@/*': ['src/*'],
          '#hooks/*': ['../src/hooks/*'],
        },
        noImplicitAny: true,
        strictNullChecks: true,
        strictFunctionTypes: true,
        strictBindCallApply: true,
        strictPropertyInitialization: true,
        noImplicitThis: true,
        alwaysStrict: true,
      },
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "sass:math"; @use "@/assets/style/_variables.scss" as *;',
          api: 'modern-compiler',
        },
      },
    },
  },
});
