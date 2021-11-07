/**
 * Copyright (c) 2012-2021 Vincent W., MIT-licensed.
 * @fileOverview PhotoShow content script for main frame.
 * @author Vincent | vincentwang863@gmail.com
 * @version 4.11.0.0 | 2021-10-21 | Vincent   // Initial version.
 * @version 4.11.1.0 | 2021-10-27 | Vincent   // Bug Fix: Remove Babel loader as the helper functions can not be addressed across modules;
 *                                            // Updates: Pack readme file to Firefox output for code review.
 * @version 4.12.0.0 | 2021-11-07 | Vincent   // Updates: Add entry 'devtools';
 *                                            // Updates: Emit code-review package for firefox.
 */

// TODO: Split common tool methods for PhotoShow to external modules and remove the terser plugin settings.
// TODO: Figure out a way to load all those website specified config code and resume Babel transpilation.

const path = require('path'),
  stripJsonComments = require('strip-json-comments'),
  CopyPlugin = require('copy-webpack-plugin'),
  CssMinimizerPlugin = require('css-minimizer-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  JsonMinimizerPlugin = require('json-minimizer-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  TerserPlugin = require('terser-webpack-plugin'),
  ZipPlugin = require('zip-webpack-plugin');

const jsonTransformers = {
  messages: (_, data, path) => {
    const locale = /_locales[/\\](\w+)/.test(path) ? RegExp.$1 : 'en';

    (function (entry) {
      Object.entries(entry).forEach(([key, value]) => {
        // Update extension-update-date.
        if (key === 'extensionUpdateDate') {
          value.message += new Date().toLocaleDateString(locale.replace('_', '-'), {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        }

        // Remove all descriptions.
        delete value.description;

        typeof value === 'object' && arguments.callee(value);
      });
    })(data);
  },
  manifest: (env, data) => {
    if (!env.prod) data.name += '_DEV';

    // Non-chrome.
    if (env.vendor) {
      delete data.update_url;
    }

    if (env.vendor === 'firefox') {
      delete data.minimum_chrome_version;
    } else {
      delete data.browser_specific_settings;
    }
  }
};

module.exports = env => ({
  mode: env.prod ? 'production' : 'development',
  devtool: false,
  context: path.resolve(__dirname, 'source'),
  resolve: {
    preferRelative: true
  },
  entry: {
    background: 'background.js',
    content: ['content/content.js', 'content/content.less'],
    devtools: 'devtools.js',
    frameContent: ['frameContent/frameContent.js', 'frameContent/frameContent.less'],
    popup: ['popup/popup.html', 'popup/popup.js', 'popup/popup.less']
  },
  output: {
    path: path.resolve(__dirname, `${env.prod ? 'dist' : 'dev'}/${env.vendor || 'chrome'}`),
    filename: pathData => (pathData.chunk.name === 'background' ? '[name].js' : '[name]/[name].js'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        type: 'asset/resource',
        generator: {
          filename: '[name]/[name][ext]'
        }
      },
      {
        test: /\.html$/,
        use: [
          'extract-loader',
          {
            loader: 'html-loader',
            options: {
              sources: false
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          'less-loader'
        ].concat(
          env.vendor === 'firefox'
            ? {
                loader: 'string-replace-loader',
                options: {
                  search: /\bchrome-extension:\/\/__MSG_@@extension_id__/g,
                  replace: ''
                }
              }
            : []
        )
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:
          env.vendor === 'firefox'
            ? [
                {
                  loader: 'string-replace-loader',
                  options: {
                    multiple: [
                      {
                        search: /\bchrome\./g,
                        replace: 'browser.'
                      },
                      {
                        search: ", 'extraHeaders'",
                        replace: ''
                      }
                    ]
                  }
                }
              ]
            : []
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/[name].css'
    }),
    new HtmlWebpackPlugin({
      chunks: ['devtools'],
      filename: 'devtools/devtools.html',
      meta: '',
      title: ''
    }),
    new CopyPlugin({
      patterns: [
        { from: 'resources', to: 'resources' },
        {
          from: '**/*.json',
          transform: {
            transformer: (content, path) => {
              const parsedContent = JSON.parse(stripJsonComments(content.toString())),
                fileName = /(\w+)\.json$/.test(path) ? RegExp.$1 : '';

              jsonTransformers[fileName](env, parsedContent, path);

              return JSON.stringify(parsedContent, ' ', env.prod ? 0 : 2);
            },
            cache: true
          }
        },
        {
          from: '*.min.js',
          info: {
            minimized: true
          }
        }
      ]
    })
  ].concat(
    env.prod
      ? new ZipPlugin({
          filename: 'PhotoShow.zip',
          exclude: /review\//
        })
      : [],
    env.prod && env.vendor === 'firefox'
      ? [
          new CopyPlugin({
            patterns: ['LICENSE', 'source', 'package.json', 'webpack.config.js']
              .map(item => ({
                from: `../${item}`,
                to: `review${item === 'source' ? '/source' : ''}`
              }))
              .concat({
                from: '../AMO-Readme.md',
                to: 'review/readme.md'
              })
          }),
          new ZipPlugin({
            filename: 'PhotoShowSourceForReview.zip',
            include: /review\//,
            pathMapper: assetPath => assetPath.replace(/^review\//, '')
          })
        ]
      : []
  ),
  optimization: {
    minimizer: [
      new TerserPlugin({
        exclude: /review\//,
        terserOptions: {
          mangle: {
            reserved: ['tools']
          }
        }
      }),
      new CssMinimizerPlugin(),
      new JsonMinimizerPlugin({
        exclude: /review\//
      })
    ]
  }
});
