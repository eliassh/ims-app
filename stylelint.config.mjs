/** @type {import('stylelint').Config} */
import html from 'stylelint-config-html';

// Merge all rule groups (later groups override earlier ones)
const rules = {
  'color-hex-length': 'long',
  'color-function-notation': 'legacy',
  'color-named': null,
  'function-no-unknown': [
    true,
    {
      ignoreFunctions: [
        'map-get',
        'map-merge',
        'light-dark',
        'linear',
        'xywh',
        'fade',
        'fadeout',
        'tint',
        'darken',
        'ceil',
        'fadein',
        'floor',
        'unit',
        'shade',
        'lighten',
        'percentage',
        'theme',
      ],
    },
  ],
  'number-max-precision': 8,
  'alpha-value-notation': 'number',
  'keyframes-name-pattern': [
    '^[a-z]+(-[a-z]+)*$|^[a-z]+([A-Z][a-z]+)*$',
    {
      message: 'Keyframe names should be in kebab-case or camelCase',
    },
  ],
  'selector-id-pattern': [
    '^[a-z]+[a-z0-9-_]*$',
    {
      message: 'Expected id selector to meet the BEM naming convention',
    },
  ],
  'selector-class-pattern': [
    '^[a-z]+([a-z0-9-_]+[a-z0-9]+)?([_-]+[a-z0-9]+([a-z0-9-_]+[a-z0-9]+)*)?([_-]+[a-z0-9]+([a-z0-9-_]+[a-z0-9]+)*)?$',
    {
      message: 'Expected class selector to meet the BEM naming convention',
    },
  ],
  'custom-property-pattern': null,
  'order/properties-alphabetical-order': true,
  'order/order': ['declarations', 'custom-properties'],
  'at-rule-no-unknown': null,
  'declaration-property-unit-allowed-list': null,
  'declaration-property-value-no-unknown': null,
  'no-empty-source': null,
  'import-notation': null,
  'no-invalid-position-at-import-rule': null,
  'no-descending-specificity': null,
  'declaration-empty-line-before': null,
  'at-rule-empty-line-before': null,
  'selector-pseudo-element-no-unknown': true,
  'scss/at-mixin-argumentless-call-parentheses': 'always',
  'scss/at-rule-no-unknown': null,
  'scss/dollar-variable-pattern': null,
  'scss/selector-no-redundant-nesting-selector': true,
  'scss/dollar-variable-empty-line-before': ['always', { ignore: ['after-comment'] }],
};

const config = {
  extends: [
    'stylelint-config-html',
    'stylelint-config-tailwindcss',
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss',
    'stylelint-config-standard',
    html,
  ],
  plugins: ['stylelint-scss', 'stylelint-order'],
  overrides: [
    {
      files: ['**/*.vue', '**/*.html'],
      customSyntax: 'postcss-html', // 👈 tells Stylelint how to parse Vue files correctly
    },
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: rules,
};

export default config;
