module.exports = {
    root: true,
    env: {
        node: true
    },
    globals: {
        uni: true,
        getCurrentPages: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: [
            2,
            4,
            {
                ArrayExpression: 'off',
                ObjectExpression: 'off'
            }
        ],
        semi: [
            2,
            'always'
        ],
        'no-trailing-spaces': [
            2,
            {
                skipBlankLines: true
            }
        ],
        'space-before-function-paren': [
            2,
            'never'
        ],
        'no-multiple-empty-lines': [
            2,
            {
                max: 2
            }
        ],
        'prefer-promise-reject-errors': [
            0
        ],
        'vue/valid-v-on': 'off',
        'no-extend-native': [
            'error',
            {
                exceptions: [
                    'String',
                    'Number'
                ]
            }
        ],
        'no-void': [
            0
        ],
        'dot-notation': [
            0
        ]
    }
};
