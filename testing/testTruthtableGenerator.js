import { TruthTableGenerator } from '../TruthTable.js'

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
 * Generate true table with 2 variables
 */
QUnit.test('variable list: [a, b]', function (assert) {
	const variableList = ['a', 'b']
	const expectedTruthTable = [{
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
	const generatedTruthTable = TruthTableGenerator.generate(variableList)

	assert.ok(compareArrayOfAssocArray(expectedTruthTable, generatedTruthTable), 'good')
})
