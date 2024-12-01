const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve("build"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      // { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      // TypeScript files
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader", // You can use 'ts-loader' or 'babel-loader' with '@babel/preset-typescript'
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/inline",
      },
    ],
  },
  externals: {
    react: "react",
  },
  resolve: {
    extensions: [".ts", ".tsx"],
  },
};
