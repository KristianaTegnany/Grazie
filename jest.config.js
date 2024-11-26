
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: [
    "./jest-setup-after-env.js",
    "@rnmapbox/maps/setup-jest"
  ],

  moduleDirectories: ["<rootDir>", "node_modules", "src"],
  transformIgnorePatterns: ["node_modules/(?!(react-native|react-native-modal|@rnmapbox))/"]
}