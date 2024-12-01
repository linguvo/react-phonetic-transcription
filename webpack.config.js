const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js",
    libraryTarget: "commonjs2", // For libraries/packages, using CommonJS output
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",       // Transpiles modern JavaScript to older versions
                "@babel/preset-react",     // Handles JSX
                "@babel/preset-typescript" // Handles TypeScript
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // Handles CSS files
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/inline", // For font files
      },
    ],
  },
  externals: {
    react: "react", // Ensures React is not bundled with your library
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"], // Allows importing files without specifying extensions
  },
};
