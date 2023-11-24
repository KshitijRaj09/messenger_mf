const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;

const sharedlibRemoteLoc = process.env.NODE_ENV === 'production' ?
  'https://kshitijraj09.github.io/sharedlib' :
  'http://localhost:5003';

module.exports = {
  entry: {
    messenger_mf: "./src/index.js",
  },
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].bundle.js",
    clean: true, 
  },
  target: "web",
  devServer: {
    port: "5004",
    static: {
      directory: path.join(__dirname, "src"),
    },
    historyApiFallback: true,
    hot: true,
    liveReload: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'messengerMFE',
      filename: 'remoteEntry.js',
      remotes: {
        Sharedlib: `sharedlibMFE@${sharedlibRemoteLoc}/remoteEntry.js`,
      },
      exposes: {
        './Messenger': './src/components/Messenger/Messenger',
      },
      shared: {
      ...deps,
      'react': { singleton: true, requiredVersion: deps['react']},
      'react-dom': { singleton: true, requiredVersion: deps['react-dom']}
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
    new Dotenv({
      systemvars: true
    }),
  ],
};