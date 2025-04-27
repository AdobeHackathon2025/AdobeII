const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isEnvProduction = process.env.NODE_ENV === "production";

const uiPath = path.resolve(__dirname, "./src/ui");

module.exports = {
  mode: isEnvProduction ? "production" : "development",
  devtool: "source-map",
  entry: {
    index: "./src/index.tsx" // <-- ONLY YOUR REACT APP
  },
  experiments: {
    outputModule: true
  },
  output: {
    pathinfo: !isEnvProduction,
    path: path.resolve(__dirname, "dist"),
    module: true,
    filename: "[name].js"
  },
  externalsType: "module",
  externalsPresets: { web: true },
  externals: {
    "add-on-sdk-document-sandbox": "add-on-sdk-document-sandbox",
    "express-document-sdk": "express-document-sdk"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      scriptLoading: "module"
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "src/*.json", to: "[name][ext]" }]
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(uiPath, "tsconfig.json")
            }
          }
        ],
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"]
  }
};
