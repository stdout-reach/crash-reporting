const path = require('path');

module.exports = function (_, options, dirname) {
  return {
    mode: options.mode,
    output: {
      path: path.resolve(dirname, 'dist'),
      filename: 'main-[hash].js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.tsx', '.ts'],
    },
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-react',
                [
                  '@babel/preset-typescript',
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
