
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./horizon-api-client.cjs.production.min.js')
} else {
  module.exports = require('./horizon-api-client.cjs.development.js')
}
