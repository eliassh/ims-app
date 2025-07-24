import stylistic from '@stylistic/eslint-plugin';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import { globalIgnores } from 'eslint/config';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importX from 'eslint-plugin-import-x';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import pluginVue from 'eslint-plugin-vue';

const { flatConfigs, configs: importXConfigs } = importX;

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
  stylistic.configs['recommended'],
  stylistic.configs['disable-legacy'],
  {
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: './tsconfig.app.json',
        }),
      ],
    },
  },
  {
    plugins: {
      'unused-imports': unusedImportsPlugin,
      'import-x': importX,
    },

    name: 'Overrides',
    rules: {
      ...importXConfigs.errors.rules,
      ...importXConfigs.warnings.rules,
      ...flatConfigs.recommended.rules,

      // Import rules
      'import-x/first': 'error',
      'import-x/no-deprecated': 'off',
      'import-x/newline-after-import': 'error',
      'import-x/named': 'error',
      'import-x/order': [
        'error',
        {
          'alphabetize': {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
          'groups': ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        },
      ],

      // Vue Composition API safety
      'vue/no-setup-props-reactivity-loss': 'error',
      'vue/no-ref-as-operand': 'error',
      'vue/no-v-html': 'warn',
      'vue/no-mutating-props': 'error',

      // Stylistic overrides
      'indent': 'off',
      '@stylistic/array-bracket-spacing': ['off'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/comma-dangle': ['error'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
        multilineDetection: 'brackets',
      }],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/padded-blocks': ['error', 'never'],
      '@stylistic/quote-props': ['error', 'consistent-as-needed'],
      '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/space-before-function-paren': ['error', {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
        catch: 'always',
      }],

      // Clean code
      'unused-imports/no-unused-imports': 'error',
    },
  },
);
