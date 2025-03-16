// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import prettier from 'eslint-plugin-prettier';

export default withNuxt([
  {
    // 除外設定
    ignores: [
      '.nuxt/**',
      '.output/**',
      'dist/**',
      'node_modules/**',
      '.vscode/**',
      '.idea/**',
      '.git/**',
      '**/*.min.js',
      '**/*.d.ts',
      '**/*.js.map',
      '**/*.ts.map',
      '.specstory/**',
    ],
  },
  {
    // Prettierプラグイン設定
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    // 相対パスの親ディレクトリ参照を禁止するルール
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [],
          patterns: ['../*'],
        },
      ],
    },
  },
  {
    // 共通ルール
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      eqeqeq: 'error',
    },
  },
  {
    // Vueファイル向けルール
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'warn',
      'vue/require-default-prop': 'error',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    },
  },
  {
    // TypeScript向けルール
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
]);
