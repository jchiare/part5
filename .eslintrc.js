module.exports = {
  "env": {
      "browser": true,
      "es6": true,
      "jest/globals": true
  },
  "extends": [ 
      "eslint:recommended",
      "plugin:react/recommended",
      "airbnb", 
      "airbnb/hooks"
  ],
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "plugins": [
      "react", 
      "jest",
      "react-hooks"
  ],
  "rules": {
      "indent": [
          "error",
          2
      ],
      "linebreak-style": [
          "error",
          "unix"
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "never"
      ],
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": [
          "error", "always"
      ],
      "arrow-spacing": [
          "error", { "before": true, "after": true }
      ],
      "no-console": 0,
      "react/prop-types": 0,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-unused-vars": [
          "error", 
          { "ignoreRestSiblings": true }
        ],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "no-shadow": "off",
    "no-nested-ternary": "off",
    "import/prefer-default-export":"warn",
    "no-param-reassign":"warn"
  },
  "settings": {
    "react": {
        "version": "detect",
        },
    }
};