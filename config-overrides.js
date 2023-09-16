const { override, addLessLoader , adjustStyleLoaders } = require('customize-cra');
const packageName = require('./package.json').name;
module.exports = {
  webpack: override(
    addLessLoader({
      // less
      lessOptions: {
        javascriptEnabled: true,
      }
    }),
    (config) => {
      config.module.rules[1].oneOf.splice(2, 0, {
        test: /\.less$/i,
        exclude: /\.module\.(less)$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      })

      config.output = {
        ...config.output,
        // library: `${packageName}`,
        // // publicPath: `http://localhost:5001/`,
        // libraryTarget: 'umd',
        // jsonpFunction: `webpackJsonp_${packageName}`,
        // globalObject: 'window'
      };
      return config;
    },
  ),
  devServer: configFunction => (proxy, allowedHost) => {
    const config = configFunction(proxy, allowedHost);
    config['headers'] = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Header": "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization",
      "AccessControlAllowCredentials": true
    }
    return config;
  }
};