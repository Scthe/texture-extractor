module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      ts: {
        alwaysTryTypes: true, // always try to resolve types under `<roo/>@types` directory even it doesn't contain any source code, like `@types/unist`
      },
    },
  },
  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-restricted-imports": [
      "error",
      {
        paths: ["lodash", "date-fns", "@material-ui", "@material-ui/core"],
      },
    ],
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "error",
      {
        additionalHooks: "(useAsync|useAsyncCallback)",
      },
    ],
    "import/order": "error",
    "import/no-duplicates": "off", // default eslint is good enough?
    "import/no-unused-modules": ["error", { unusedExports: true }],
    // we have TS for following:
    "import/namespace": "off",
    "import/no-named-as-default": "off",
    "import/default": "off",
    "import/no-named-as-default-member": "off",
    "import/named": "off",
  },
};
