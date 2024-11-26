module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ["@babel/plugin-transform-flow-strip-types", { loose: true }],
      ["@babel/plugin-transform-private-methods", { loose: true }],
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            src: "./src",
            assets: "./src/assets",
            hooks: "./src/hooks",
            routes: "./src/routes",
            services: "./src/services",
            store: "./src/store",
            themes: "./src/themes",
            screen: "./src/view/screen",
            widget: "./src/view/widget",
          },
        },
      ],
    ],
  }
}
