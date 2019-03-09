module.exports = {
    extends: ["standard"],
    rules: {
        semi: ["error", "never"]
    },
    parser: "esprima",
    parserOptions: {
        ecmaVersion: 6, // optional, recommended 6+
    },
}