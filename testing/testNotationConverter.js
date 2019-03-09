/**
 * Simple test and, or
 */
import { NotationConverter } from '../TruthTable.js'

QUnit.test('infix: (a and c) to postfix', function (assert) {
  const infixInput = 'a and c'
  const expectedPostfix = 'a c and'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

QUnit.test('infix: (a or c) to postfix', function (assert) {
  const infixInput = 'a or c'
  const expectedPostfix = 'a c or'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

/**
 * Testing includes not, and operation
 */
QUnit.test('infix: (a and not c) to postfix', function (assert) {
  const infixInput = 'a and not c'
  const expectedPostfix = 'a c not and'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

QUnit.test('infix: (not a and c) to postfix', function (assert) {
  const infixInput = 'not a and c'
  const expectedPostfix = 'a not c and'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

QUnit.test('infix: (not a and not c) to postfix', function (assert) {
  const infixInput = 'not a and not c'
  const expectedPostfix = 'a not c not and'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

/**
 * Testing includes not, or operation
 */
QUnit.test('infix: (a or not c) to postfix', function (assert) {
  const infixInput = 'a or not c'
  const expectedPostfix = 'a c not or'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

QUnit.test('infix: (not a or c) to postfix', function (assert) {
  const infixInput = 'not a or c'
  const expectedPostfix = 'a not c or'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

QUnit.test('infix: (not a or not c) to postfix', function (assert) {
  const infixInput = 'not a or not c'
  const expectedPostfix = 'a not c not or'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

/**
 * Testing includes not, or, and operation with precedence problem
 */
QUnit.test('infix: (a or not c and b) to postfix', function (assert) {
  const infixInput = 'a or not c and b'
  const expectedPostfix = 'a c not b and or'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

QUnit.test('infix: (not a or not c or b and d) to postfix', function (assert) {
  const infixInput = 'not a or not c or b and d'
  const expectedPostfix = 'a not c not b d and or or'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

/**
 * Testing includes bucket with spaces for separation
 */
QUnit.test('infix: ( a or b ) to postfix', function (assert) {
  const infixInput = '( a or b )'
  const expectedPostfix = 'a b or'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

QUnit.test('infix: ( a and ( b or c ) )to postfix', function (assert) {
  const infixInput = 'a and ( b or c )'
  const expectedPostfix = 'a b c or and'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

/**
 * Testing buckets without space
 */
QUnit.test('infix: ( ( a and c ) )to postfix', function (assert) {
  const infixInput = '( a and c )'
  const expectedPostfix = 'a c and'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

QUnit.test('infix: ( (a and c ) )to postfix', function (assert) {
  const infixInput = '(a and c )'
  const expectedPostfix = 'a c and'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

QUnit.test('infix: ( (a and c ) )to postfix', function (assert) {
  const infixInput = '( a and c)'
  const expectedPostfix = 'a c and'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

QUnit.test('infix: ( (a and c ) )to postfix', function (assert) {
  const infixInput = '(a and c)'
  const expectedPostfix = 'a c and'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

/**
* Test implies...
*/
QUnit.test('infix: ( a => c )to postfix', function (assert) {
  const infixInput = '(a => c)'
  const expectedPostfix = 'a c =>'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

QUnit.test('infix: ( a => b or c)to postfix', function (assert) {
  const infixInput = '(a => b or c)'
  const expectedPostfix = 'a b c or =>'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

QUnit.test('infix: ( a => b and c)to postfix', function (assert) {
  const infixInput = '(a => b and c)'
  const expectedPostfix = 'a b c and =>'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

QUnit.test('infix: ( a => not b )to postfix', function (assert) {
  const infixInput = '(a => not b)'
  const expectedPostfix = 'a b not =>'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})

QUnit.test('infix: ( a <=> b )to postfix', function (assert) {
  const infixInput = 'a <=> b'
  const expectedPostfix = 'a b <=>'

  const converter = new NotationConverter()
  const result = converter.convert(infixInput)

  assert.ok(result === expectedPostfix, 'ExepctedPostfix: ' + expectedPostfix + ' Result: ' + result)
})