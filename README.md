# pull-test

run assertion tests using [pull streams](https://pull-stream.github.io/)

```shell
npm install --save-dev pull-test
```

## example

```js
const pull = require('pull-stream')
const test = require('pull-test')

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
```

## usage

### `test = require('pull-test')`

### `through = test(options)`

returns a through [pull stream](https://pull-stream.github.io/),

which expects to receive test objects with shape:

- `name`: name of the test
- `test`: function which receives `(assert, cb)`. assert is the same as the [node core `assert` module](https://nodejs.org/api/assert.html) and automatically collects errors. `cb` is to be called when the test is done, or _the test runner has errored_ (it will close the stream with the error).

and will return test result objects with shape:

- `name`: name of test
- `assertions`: array of assertions results from running test. either `true` if assertion passed or an instance of `assert.AssertionError` if assertion failed.
- `duration`: number of microseconds that test took to run

## license

The Apache License

Copyright &copy; 2016 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
