const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const cssLoaders = (extra) => {
  let loaders = [MiniCssExtractPlugin.loader, "css-loader"];
  if (extra) {
    loaders.push(extra);
  }
  return loaders;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./scripts/main.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "bundle"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        test: /\.m?js(\?.*)?$/i,
      }),
    ],
  },
  devServer: {
    port: 4200,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./index.html",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.scss$/,
        use: cssLoaders("sass-loader"),
      },
      {
        test: /\.mp3$/,
        loader: "file-loader",
        options: {
          name: "[path][contenthash].[ext]",
        },
      },
    ],
  },
};
