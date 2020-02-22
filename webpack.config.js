module.exports = {
    entry: './scripts/app.js',
    output: {
        path: './dist',
        filename: 'app.js'
    },
    devtool: 'source-map' ,
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            }
        ]

    }
};