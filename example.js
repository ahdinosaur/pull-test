const pull = require('pull-stream')
const test = require('./')

const tests = {
  'it succeeds': function (assert) {
    assert(true)
  },
  'it fails!': function (assert) {
    assert(false)
  },
  'it errors!': function (assert, cb) {
    cb(new Error('error'))
  }
}

test(tests)
