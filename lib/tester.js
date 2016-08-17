const asyncMap = require('pull-stream/throughs/async-map')
const coreAssert = require('core-assert')

const wrapAssert = require('./wrapAssert') 

module.exports = Tester

function Tester (options) {
  return asyncMap(function (testObject, cb) {
    const test = testObject.test
    const name = testObject.name
    const start = Date.now()

    const assertions = []
    const assert = wrapAssert(assertions, coreAssert)

    if (test.length === 2) {
      test(assert, function (err) {
        if (err) return cb(err)

        const duration = Date.now() - start

        cb(null, {
          name,
          duration,
          assertions
        })
      })
    } else {
      test(assert)

      const duration = Date.now() - start

      cb(null, {
        name,
        duration,
        assertions
      })
    }
  })
}
