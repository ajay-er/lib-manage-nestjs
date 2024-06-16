const jsRules = {
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['unused-imports', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-param-reassign': [
      'error',
      {
        ignorePropertyModificationsFor: ['_opts'],
        props: true,
      },
    ],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@angular-eslint/no-empty-lifecycle-method': 'off',
    'no-underscore-dangle': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
  },
};

module.exports = {
  env: {
    jest: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'airbnb-typescript/base',
    ...jsRules.extends,
  ],
  ignorePatterns: ['.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint/eslint-plugin', ...jsRules.plugins],
  root: true,
  rules: {
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        disallowTypeAnnotations: false,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'import/no-extraneous-dependencies': [
      'off',
      {
        devDependencies: [
          '**/test.ts',
          '**/*.spec.ts',
          '**/*.e2e-spec.ts',
          '**/*.test.ts',
        ],
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        // Enforce that all variables, functions, and properties follow camelCase or PascalCase
        filter: {
          match: false,
          regex: '^npm',
        },
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
        selector: 'variableLike',
      },
      {
        // Enforce that boolean variables are prefixed with 'is' or 'has'
        format: ['PascalCase'],
        leadingUnderscore: 'allow',
        prefix: ['is', 'has'],
        selector: 'variable',
        types: ['boolean'],
      },
      {
        // Enforce that class, interface, type, and enum follow PascalCase
        format: ['PascalCase'],
        selector: 'typeLike',
      },
      {
        // Enforce that interface names do not begin with an I
        custom: {
          match: false,
          regex: '^I[A-Z]',
        },
        format: ['PascalCase'],
        selector: 'interface',
      },
      {
        format: ['UPPER_CASE'],
        selector: 'enumMember',
      },
    ],
    ...jsRules.rules,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};
