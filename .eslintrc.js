module.exports = {
        "env": {
          "browser": true,
          "es6": true
        },
        "parser": "babel-eslint",
        "extends": [
          "airbnb",
          "plugin:meteor/recommended"
        ],
        "parserOptions": {
          "allowImportExportEverywhere": true
        },
        "plugins": [
          "meteor"
        ],
        "settings": {
          "import/resolver": "meteor"
        },
        "rules": {
          "no-plusplus": false
        }
};