import 'dotenv-extended/config';
import {resolve} from 'path';
import {HotModuleReplacementPlugin, optimize, NamedModulesPlugin} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MinifyPlugin from 'babel-minify-webpack-plugin';
import PreloadWebpackPlugin from 'preload-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

export default env => {
  const plugins = [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: './client/index.html'
    }),
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      fileBlacklist: [
        /\.map/,
        /\.\/admin\.[a-f0-9]{20}\.js$/
      ]
    }),
    new optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),
    new CompressionPlugin()
  ];

  let devtool = 'eval-source-map';

  if (env === 'production') {
    process.env.NODE_ENV = env;
    devtool = 'source-map';

    plugins.push(new MinifyPlugin());
    plugins.push(new optimize.ModuleConcatenationPlugin());
  }

  return {
    entry: {
      main: [
        'react-hot-loader/patch',
        './client/index.js'
      ],
      vendor: [
        'lodash',
        'react',
        'material-ui'
      ]
    },
    output: {
      path: resolve(__dirname, './dist/client'),
      filename: './[name].[hash].js',
      chunkFilename: './[name].[chunkhash].js'
    },
    devtool,
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.(jp(e)?g|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '/[hash].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins,
    devServer: {
      port: 9090,
      inline: true,
      historyApiFallback: true,
      hot: true,
      proxy: {
        '/api': {
          target: `http://localhost:${process.env.PORT}`
        },
        '/auth': {
          target: `http://localhost:${process.env.PORT}`
        },
        '/ws': {
          target: `http://localhost:${process.env.PORT}`
        }
      }
    }
  };
};