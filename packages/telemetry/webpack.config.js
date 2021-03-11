const baseConfig = require('../../webpack.config');
const path = require('path');
const { DefinePlugin } = require('webpack');

module.exports = function (env, options) {
  return {
    ...baseConfig(env, options, __dirname),
    entry: path.resolve(__dirname, 'lib'),
    plugins: [
      new DefinePlugin({
        ENVIRONMENT: options.mode,
        AUTOMATED_TEST: env.test ?? false,
      }),
    ],
    devtool: 'inline-source-map',
  };
};
