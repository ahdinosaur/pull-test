const pull = require('pull-stream')
const test = require('./')

const tests = [
  {
    name: 'it works!',
    test: function (assert, cb) {
      assert(true)
      cb()
    }
  },
  {
    name: 'it fails!',
    test: function (assert, cb) {
      assert(false)
      cb()
    }
  },
  {
    name: 'it errors!',
    test: function (assert, cb) {
      cb(new Error('error'))
    }
  }
]

pull(
  pull.values(tests),
  test(),
  pull.drain(function (result) {
    console.log('test result', result)
  }, function (err) {
    console.log('test ended')
    if (err) console.error(err)
  })
)
