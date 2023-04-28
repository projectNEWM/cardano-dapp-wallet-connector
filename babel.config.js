module.exports = {
  presets: ["@babel/preset-typescript", "@babel/preset-react", "@babel/preset-env"],
  plugins: [
    [
      "module-resolver",
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        root: ["./src"],
      },
    ],
  ],
};
