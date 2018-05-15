module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "browser": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module",
        "ecmaVersion": 6
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // "indent": [
        //     "error",
        //     "tab"
        // ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        // "quotes": [
        //     "error",
        //     "double"
        // ],
        // "semi": [
        //     "error",
        //     "always"
        // ]
        "no-cond-assign": 2,//禁止在条件表达式中使用赋值语句
        "eqeqeq": "warn",
        "strict": "off",
    }
};