process.env.NODE_ENV = (process.env.NODE_ENV || 'development');

const webpack = require('webpack');
const rimraf = require('rimraf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const plugins = [
    {
        apply: (compiler) => {
            rimraf.sync(compiler.options.output.path);
        },
    },
    new webpack.optimize.CommonsChunkPlugin({
        async: true,
        children: true,
        minChunks: 4,
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new ExtractTextPlugin({ filename: 'app.css', allChunks: true }),
    new webpack.optimize.AggressiveMergingPlugin(),
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }));
}

module.exports = [{
    context: __dirname + '/app',
    watchOptions: {
        poll: true,
    },
    entry: './index.jsx',

    output: {
        path: __dirname + './../backend/public',
        publicPath: '/public/',
        filename: 'app.js',
    },

    plugins,

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react'],
                },
            },
            {
                test: /\.js$/,
                include: __dirname + '/frontend',
                loader: 'babel-loader?presets[]=env,presets[]=react',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                loader: 'raw',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader?sourceMap' }),
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
}];
