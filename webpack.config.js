module.exports = {
    output: {
        filename: "bundle.js",
      },
  module: {
    rules: [
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader",
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
            },
            {
              loader: "sass-loader",
            },
          ],
        },
        {
          test: /\.(gif|png|jpe?g|jpg|svg|ttf|swf|eot)$/i,
          loader: "url-loader",
          options: {
            publicPath: "./static/",
            name: "[name].[ext]",
            outputPath: "./static/",
          },
        },
        {
          test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
          loader: "url-loader"
        }
      ],
  },
};
