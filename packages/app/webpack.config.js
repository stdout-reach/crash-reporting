const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseConfig = require("../../webpack.config");
const path = require("path");

module.exports = function (env, options) {
  return {
    ...baseConfig(env, options, __dirname),
    entry: path.resolve(__dirname, "lib"),
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "lib/index.html"),
      }),
    ],
    devServer: {
      contentBase: path.resolve(__dirname, "dist"),
      compress: true,
      port: 8080,
      stats: {
        assets: true,
        entrypoints: false,
        modules: false,
        moduleAssets: false,
        children: false,
        colors: true,
        chunkModules: false,
        excludedModules: [/node_modules/],
      },
      open: true,
    },
  };
};
