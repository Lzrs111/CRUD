var HTMLWebpackPlugin = require("html-webpack-plugin")
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + "/front/index.html",
    filename: "index.html",
    inject: "body"
});


module.exports = {
    entry: __dirname + "/front/index.js",
    output: {
        filename: 'working.js',
        path: __dirname + "/build"
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        },{
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }
      ]
    },
    plugins: [HTMLWebpackPluginConfig]
}