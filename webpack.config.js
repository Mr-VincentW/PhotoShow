const path = require('path'),
  {CleanWebpackPlugin} = require('clean-webpack-plugin'),
  CopyPlugin = require('copy-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

let COMPILING_ENV = 'chrome-dev';

// TODO: To get toLocaleDateString() method work properly with 'locales' and 'options' parameters,
//       Node needs to be built with full-icu support. Currently, only version 13+ of Node is found to support this by default.
//       This problem needs to be resolved later...
// For more info: https://github.com/nodejs/node/issues/19214
//                https://techoverflow.net/2018/09/19/fixing-nodejs-intl-datetimeformat-not-formatting-properly-for-locales/
const minifyJSON = (content, path) => {
  let json = JSON.parse(
    content
      .toString()
      .replace(/(?:\/\*\*[\s\S]*?\*\/|\s*(?<!:)\/\/.*)/gm, '') // Remove head comments.
      .replace(/(?:^\s*[\r\n]|,(?=\s*[\r\n]\s*\}))/gm, '') // Remove other comments.
  );

  if (/manifest\.json$/.test(path)) {
    // manifest.json.
    /^chrome-/.test(COMPILING_ENV) || delete json.update_url;

    /^firefox-/.test(COMPILING_ENV) ?
      delete json.minimum_chrome_version :
      delete json.browser_specific_settings;

    /-dev$/.test(COMPILING_ENV) && (json.name += '_dev');
  } else if (/[/\\]([^/\\]+)[/\\]messages\.json$/.test(path)) {
    // i18n messages.
    json.extensionUpdateDate.message += new Date().toLocaleDateString(
      RegExp.$1.replace('_', '-'),
      {year: 'numeric', month: 'long', day: 'numeric'}
    );

    (function(json) {
      Object.values(json).forEach(value => {
        delete value.description;
        typeof value == 'object' && arguments.callee(value);
      });
    })(json);
  }

  return JSON.stringify(json, ' ', /-dev$/.test(COMPILING_ENV) ? 2 : 0);
};

let config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    background: './background.js',
    'popup/popup': './popup/popup.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|woff2?)$/,
        loader: 'file-loader',
        options: {
          name: '../[path][name].[ext]',
          emitFile: false
        },
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin(
      [
        {
          from: '**/*.json',
          transform: minifyJSON
        },
        {
          from: 'resources',
          to: 'resources'
        }
      ],
      {
        copyUnmodified: true
      }
    ),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: 'popup/popup.html',
      title: 'PhotoShow Popup',
      minify: true,
      chunks: ['popup/popup']
    }),
    new ChromeExtensionReloader({
      entries: {
        background: 'background',
        popup: 'popup/popup'
      }
    })
  ]
};

module.exports = env => {
  COMPILING_ENV = env;

  config.mode = /-dev$/.test(COMPILING_ENV) ? 'development' : 'production';

  return config;
};
