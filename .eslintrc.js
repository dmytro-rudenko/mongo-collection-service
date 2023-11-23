module.exports = {
    env: {
        browser: false,
        es2021: true,
        node: true,
        jest: true,
    },
    extends: ["eslint:recommended", "prettier"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        complexity: ["error", 6],
        camelcase: "error",
        "max-lines": ["error", { max: 700 }],
        "max-depth": ["error", 4],
        "max-params": ["error", 4],
        "no-duplicate-imports": "error",
        "no-restricted-imports": [
            "error",
            {
                patterns: ["../"],
            },
        ],
        "spaced-comment": "error",
        quotes: ["error", "double"],
    },
}
