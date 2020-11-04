const webpack = require("webpack");

module.exports = {
  entry: ["./src/index.js", "./src/styles/index.scss"],
  plugins: [
    new webpack.ProvidePlugin({
      WaveSurfer: "wavesurfer.js",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(mp4|png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      wavesurfer: require.resolve("wavesurfer.js"),
    },
  },
  output: {
    path: __dirname + "./../dist",
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    contentBase: "./dist",
    publicPath: "/",
    historyApiFallback: true,
  },
};
