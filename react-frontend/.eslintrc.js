module.exports = {
    parser: "@typescript-eslint/parser",
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended", "prettier"],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        "prettier/prettier": "warn",
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    env: {
        node: true,
        jest: true,
    },
};
