module.exports = {
        "env": {
          "browser": true,
          "es6": true
        },
        "parser": "babel-eslint",
        "extends": [
          "airbnb",
          "plugin:prettier/recommended",
          "prettier/react",
          "plugin:meteor/recommended"
        ],
        "parserOptions": {
          "allowImportExportEverywhere": true
        },
        "plugins": [
          "meteor",
          "prettier",
        ],
        "settings": {
          "import/resolver": "meteor"
        },
        "rules": {
          "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
            "import/no-unresolved": [
               1, 
               { caseSensitive: false }
            ]
        }
};