/** @type {import('react-native-unistyles/plugin').UnistylesPluginOptions} */

const unistylesPluginOptions = {
  // any component in this folder will be processed
  root: 'src',
  // also files with these imports will be processed (in any non-root folder)
  autoProcessImports: ['@react-native-ui-kit', '@codemask/styles'],
  // additionally process components from this `node_modules` package
  autoProcessPaths: ['external-library/components'],
  // log what you've found
  debug: true,
}


module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['react-native-unistyles/plugin', unistylesPluginOptions]
  ],
};
