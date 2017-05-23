const env = process.env.NODE_ENV || 'production'

/* copy the .env.(dev|prod) to .env */
const fs = require('fs')
;(function copySync(src, dest, fs) {
  if (!fs.existsSync(src)) {
    throw new Error(
      'please setup your .env.(dev|prod)!\n .env.example could be referred for setting your runtime environment.'
    )
  }
  fs.writeFileSync(dest, fs.readFileSync(src, 'utf-8'))
})(`.env.${env === 'production' ? 'prod' : 'dev'}`, '.env', fs)

require('dotenv-safe').load()
if (env === 'development') {
  module.exports = require(`./development.js`)
} else {
  module.exports = require('./production.js')
}
