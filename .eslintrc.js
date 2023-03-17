module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['unused-imports', 'sort-imports-es6-autofix'],
  "rules": {
    "sort-imports": [
      "error",
      {
        "ignoreDeclarationSort": true
      }
    ]
  }
}
