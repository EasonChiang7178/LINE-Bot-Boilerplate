const commonConfig = require('./common')

const devConfig = Object.assign({}, commonConfig, {
  logger: false
})

module.exports = devConfig
