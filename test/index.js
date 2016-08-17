const pull = require('pull-stream')
const test = require('../')

const tests = [
  {
    name: 'pull-test',
    test: function (assert, cb) {
      assert.ok(test, 'module is require-able')
      cb()
    }
  }
]

pull(
  pull.values(tests),
  test.Tester(),
  pull.log()
)
