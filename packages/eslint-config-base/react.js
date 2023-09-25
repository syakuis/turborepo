const { resolve } = require("node:path");
const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  parserOptions: {
    project,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: {project},
      alias: {
        map: [["@", "./src"]],
      },
    },
  },
  rules: {
    "no-console": "off",
    "import/no-unresolved": ["error", { commonjs: true, amd: true }],
    "import/extensions": ["error", "ignorePackages", {
      "ts": "never",
      "tsx": "never",
      "js": "never",
      "jsx": "never",
    }],
    "import/no-extraneous-dependencies": ["error"],
    "jsx-a11y/label-has-for": [
      "error",
      {
        // components: ["Label"],
        required: {
          some: ["nesting", "id"],
        },
        allowChildren: true,
      },
    ],
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        required: {
          some: ["nesting", "id"],
        },
      },
    ],
    "jsx-a11y/click-events-have-key-events": ["off"],
    "jsx-a11y/mouse-events-have-key-events": ["off"],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["to", "hrefLeft", "hrefRight"],
        aspects: ["invalidHref"],
      },
    ],
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "import/order": ["error", {
      "groups": [["builtin", "external"], "internal", "parent", "sibling", "index"],
      "pathGroupsExcludedImportTypes": ["builtin"],
      "newlines-between": "always",
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true,
      },
    }],
    "comma-dangle": ["error", {
      "arrays": "only-multiline",
      "objects": "only-multiline",
    }],
  },
  overrides: [
    {
      files: ["*.tsx", "*.ts"],
      parser: "@typescript-eslint/parser",
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@typescript-eslint/strict",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
        "plugin:import/typescript",
      ],
      plugins: [
        "@typescript-eslint",
        "import",
        "react",
        "react-hooks",
        "jsx-a11y",
        "prettier",
      ],
      parserOptions: {
        project,
        createDefaultProgram: true,
      },
      settings: {
        "import/resolver": {
          typescript: {project},
        },
      },
      rules: {
        "react/react-in-jsx-scope": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/prop-types": "off",
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: ['typeLike', 'interface'],
            format: ['PascalCase']
          },
        ],
      },
    },
    {
      files: ["(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$"],
      plugins: ["jest"],
      extends: ["plugin:jest/recommended"],
      rules: { "jest/prefer-expect-assertions": "off" },
    },
  ],
  ignorePatterns: ["node_modules/", "dist/"],
};
