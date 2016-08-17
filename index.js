const asyncMap = require('pull-stream/throughs/async-map')
const coreAssert = require('core-assert')

const wrapAssert = require('./lib/wrapAssert') 

module.exports = Tester

function Tester (options) {
  return asyncMap(function (testObject, cb) {
    const test = testObject.test
    const name = testObject.name
    const start = Date.now()

    const errors = []
    const assert = wrapAssert(errors, coreAssert)

    test(assert, function (err) {
      if (err) return cb(err)

      const duration = Date.now() - start

      cb(null, {
        name,
        duration,
        errors
      })
    })
  })
}
