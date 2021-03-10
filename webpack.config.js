const path = require("path");

module.exports = function (env, options, dirname) {
  return {
    mode: env,
    output: {
      path: path.resolve(dirname, "dist"),
      filename: "main-[hash].js",
    },
    resolve: {
      extensions: [".js", ".jsx", ".tsx", ".ts"],
    },
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-react",
                [
                  "@babel/preset-typescript",
                  { isTSX: true, allExtensions: true },
                ],
              ],
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
  };
};
