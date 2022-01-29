const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ruleForStyle = {
  test: /\.css$/,
  use: ["style-loader", "css-loader"],
};
const ruleForJavascript = {
  test: /\.jsx?$/,
  loader: "babel-loader",
  options: {
    presets: [
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
        },
      ],
    ],
  },
};
const rules = [ruleForJavascript, ruleForStyle];
module.exports = (env,argv) => {
  const {mode} = argv;
  const isProduction = mode === 'production'
  return {
    output: {
      filename:isProduction ? '[name].[contenthash].js' : 'main.js',
      path: path.resolve(__dirname, "public"),
    },
    plugins: [new HtmlWebpackPlugin({ template: "src/index.html" })],
    module: { rules },
    devServer: {
      open: true,
      port: 3000,
      compress: true,
    },
  };
};
