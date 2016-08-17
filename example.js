const pull = require('pull-stream')
const test = require('./')

const tests = [
  {
    title: 'it works!',
    test: function (assert, cb) {
      assert(true)
      cb()
    }
  },
  {
    title: 'it fails!',
    test: function (assert, cb) {
      assert(false)
      cb()
    }
  },
  {
    title: 'it errors!',
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
