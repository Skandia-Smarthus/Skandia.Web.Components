const path = require('path')

module.exports = {
    entry: './js/index.js',
    output: {
        filename: "lib.js",
        path: path.resolve(__dirname, 'site'),
        libraryTarget: "var",
        library: "onboarding"
    },

    optimization: {
        minimize: false,
        usedExports: false
    }
}