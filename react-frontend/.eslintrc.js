module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended",
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        "prettier/prettier": "warn",
        "@typescript-eslint/ban-types": "warn",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    env: {
        node: true,
    },
};
