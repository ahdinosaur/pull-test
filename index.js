const pull = require('pull-stream/pull')
const coreAssert = require('core-assert')
const defined = require('defined')

const from = require('./lib/from')
const Tester = require('./lib/tester')
const Reporter = require('./lib/reporter')

module.exports = Test
module.exports.from = from
module.exports.Tester = Tester
module.exports.Reporter = Reporter

function Test (test, options) {
  if (arguments.length === 1) {
    options = test
  }
  options = defined(options, {})
  options = Object.assign(options, {
    assert: defined(options.assert, coreAssert)
  })

  pull(
    defined(options.source, from(test)),
    defined(options.tester, Tester(options)),
    defined(options.reporter, Reporter(options))
  )
}

