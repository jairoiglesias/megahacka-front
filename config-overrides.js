// const rewireMobX = require('react-app-rewire-mobx')
const {
    override,
    addDecoratorsLegacy,
    disableEsLint,
    addBundleVisualizer,
    addWebpackAlias,
    adjustWorkbox
  } = require("customize-cra")

module.exports = override(
    addDecoratorsLegacy()
)