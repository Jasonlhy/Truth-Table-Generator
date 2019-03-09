import { PostfixEvaluator } from '../TruthTable.js'

function compareArrayOfAssocArray (array1, array2) {
  let ok = array1.length === array2.length
  // compare each row
  for (let i = 0; ok && i < array1.length; i++) {
    const key1 = Object.keys(array2[i])
    const key2 = Object.keys(array1[i])

    // compare each key and each key value
    ok = key1.length === key2.length
    for (let k = 0; ok && k < key1.length; k++) {
      ok = key1[k] === key2[k] && array2[i][ key1[k] ] === array1[i][ key2[k] ]
    }
  }

  return ok
}

/**
 * Test simple operation
 */
QUnit.test('evaluate postfix: (a b and)', function (assert) {
  const expectedTruthTable = [{
    'a': true,
    'b': true,
    'result': true
  }, {
    'a': true,
    'b': false,
    'result': false
  }, {
    'a': false,
    'b': true,
    'result': false
  }, {
    'a': false,
    'b': false,
    'result': false
  }]

  const truthTable = [{
    'a': true,
    'b': true
  }, {
    'a': true,
    'b': false
  }, {
    'a': false,
    'b': true
  }, {
    'a': false,
    'b': false
  }]

  const evaluator = new PostfixEvaluator()
  evaluator.setTruthTable(truthTable)
  evaluator.evaluate('a b and')

  const evaluatedTruthTable = evaluator.getTruthTable()
  const ok = compareArrayOfAssocArray(expectedTruthTable, evaluatedTruthTable)

  assert.ok(ok, 'result of (a b and ) are equal as ' + JSON.stringify(expectedTruthTable))
})

QUnit.test('evaluate postfix: (a b or)', function (assert) {
  const expectedTruthTable = [{
    'a': true,
    'b': true,
    'result': true
  }, {
    'a': true,
    'b': false,
    'result': true
  }, {
    'a': false,
    'b': true,
    'result': true
  }, {
    'a': false,
    'b': false,
    'result': false
  }]

  const truthTable = [{
    'a': true,
    'b': true
  }, {
    'a': true,
    'b': false
  }, {
    'a': false,
    'b': true
  }, {
    'a': false,
    'b': false
  }]

  const evaluator = new PostfixEvaluator()
  evaluator.setTruthTable(truthTable)
  evaluator.evaluate('a b or')

  const evaluatedTruthTable = evaluator.getTruthTable()
  const ok = compareArrayOfAssocArray(expectedTruthTable, evaluatedTruthTable)

  assert.ok(ok, 'result of (a b or )are equal as ' + JSON.stringify(expectedTruthTable))
})

QUnit.test('evaluate postfix: (a b =>)', function (assert) {
  const expectedTruthTable = [{
    'a': true,
    'b': true,
    'result': true
  }, {
    'a': true,
    'b': false,
    'result': false
  }, {
    'a': false,
    'b': true,
    'result': true
  }, {
    'a': false,
    'b': false,
    'result': true
  }]

  const truthtable = [{
    'a': true,
    'b': true
  }, {
    'a': true,
    'b': false
  }, {
    'a': false,
    'b': true
  }, {
    'a': false,
    'b': false
  }]

  const evaluator = new PostfixEvaluator()
  evaluator.setTruthTable(truthtable)
  evaluator.evaluate('a b =>')

  const evaluatedTruthTable = evaluator.getTruthTable()
  const ok = compareArrayOfAssocArray(expectedTruthTable, evaluatedTruthTable)

  assert.ok(ok, 'result of (a b => )are equal as ' + JSON.stringify(expectedTruthTable))
})

QUnit.test('evaluate postfix: (a b <=>)', function (assert) {
  const expectedTruthTable = [{
    'a': true,
    'b': true,
    'result': true
  }, {
    'a': true,
    'b': false,
    'result': false
  }, {
    'a': false,
    'b': true,
    'result': false
  }, {
    'a': false,
    'b': false,
    'result': true
  }]

  const truthTable = [{
    'a': true,
    'b': true
  }, {
    'a': true,
    'b': false
  }, {
    'a': false,
    'b': true
  }, {
    'a': false,
    'b': false
  }]

  const evaluator = new PostfixEvaluator()
  evaluator.setTruthTable(truthTable)
  evaluator.evaluate('a b <=>')

  const evaluatedTruthTable = evaluator.getTruthTable()
  const ok = compareArrayOfAssocArray(expectedTruthTable, evaluatedTruthTable)

  assert.ok(ok, 'result of (a b <=> )are equal as ' + JSON.stringify(expectedTruthTable))
})
