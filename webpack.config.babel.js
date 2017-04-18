import 'dotenv-extended/config';
import {HotModuleReplacementPlugin} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import BabiliPlugin from 'babili-webpack-plugin';

export default env => {
  const plugins = [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './client/index.html'

      // favicon: './client/favicon.ico'
    })
  ];

  if (env === 'production') {
    plugins.push(new BabiliPlugin());
  }

  return {
    entry: {
      main: './client/index.js'
    },
    output: {
      path: '/dist/client',
      filename: './[name].[hash].js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
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
      port: process.env.WEBPACK_PORT,
      inline: true,
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: `http://localhost:${process.env.PORT}`
        }
      }
    }
  };
};