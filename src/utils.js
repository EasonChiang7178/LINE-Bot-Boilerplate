require('es6-promise').polyfill()
require('isomorphic-fetch')

function toArray(maybeArray) {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray]
}
module.exports.toArray = toArray

function request(requestInfo) {
  return fetch(requestInfo)
}
module.exports.request = request
