function compareArrayOfAssocArray(array1, array2){
	var ok = array1.length == array2.length;
	// compare each row
	for (var i = 0; ok && i < array1.length; i++) {
		var key1 = Object.keys(array2[i]);
		var key2 = Object.keys(array1[i]);

		// compare each key and each key value
		ok = key1.length == key2.length;
		for (var k = 0; ok && k < key1.length; k++) {
			ok = key1[k] ==  key2[k]
				 && array2[i][ key1[k] ] == array1[i][ key2[k] ];
		}
	}
	
	return ok;
}

/**
 * Generate true table with 2 variables
 */
QUnit.test("variable list: [a, b]", function(assert) {
	var generator = new TruthTableGenerator();
	var variableList = [ "a", "b" ];
	var expectedTruthtable = [ {
		"a" : true,
		"b" : true
	}, {
		"a" : true,
		"b" : false
	}, {
		"a" : false,
		"b" : true
	}, {
		"a" : false,
		"b" : false
	} ];
	var generatedTruthtable = TruthTableGenerator.generate(variableList);

	assert.ok(compareArrayOfAssocArray(expectedTruthtable, generatedTruthtable), "good");
});