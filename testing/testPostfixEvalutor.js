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
 * Test simple operation
 */
QUnit.test("evaluate postfix: (a b and)", function(assert) {
	var expectedEvaluteTruthtable = [ {
		"a" : true,
		"b" : true,
		"result" : true
	}, {
		"a" : true,
		"b" : false,
		"result" : false
	}, {
		"a" : false,
		"b" : true,
		"result" : false
	}, {
		"a" : false,
		"b" : false,
		"result" : false
	} ];
	
	var truthtable = [ {
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
	
	var evalutor = new PostfixEvaluator();
	evalutor.setTruthTable(truthtable);
	evalutor.evaluate("a b and");
	
	var evalutedTruthtable = evalutor.getTruthTable();
	var ok = compareArrayOfAssocArray(expectedEvaluteTruthtable, evalutedTruthtable);
	
	assert.ok(ok, "result of (a b and ) are equal as "+ JSON.stringify(expectedEvaluteTruthtable));
});

QUnit.test("evaluate postfix: (a b or)", function(assert) {
	var expectedEvaluteTruthtable = [ {
		"a" : true,
		"b" : true,
		"result" : true
	}, {
		"a" : true,
		"b" : false,
		"result" : true
	}, {
		"a" : false,
		"b" : true,
		"result" : true
	}, {
		"a" : false,
		"b" : false,
		"result" : false
	} ];
	
	var truthtable = [ {
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
	
	var evalutor = new PostfixEvaluator();
	evalutor.setTruthTable(truthtable);
	evalutor.evaluate("a b or");
	
	var evalutedTruthtable = evalutor.getTruthTable();
	var ok = compareArrayOfAssocArray(expectedEvaluteTruthtable, evalutedTruthtable);
	
	assert.ok(ok, "result of (a b or )are equal as "+ JSON.stringify(expectedEvaluteTruthtable));
});

QUnit.test("evaluate postfix: (a b =>)", function(assert) {
	var expectedEvaluteTruthtable = [ {
		"a" : true,
		"b" : true,
		"result" : true
	}, {
		"a" : true,
		"b" : false,
		"result" : false
	}, {
		"a" : false,
		"b" : true,
		"result" : true
	}, {
		"a" : false,
		"b" : false,
		"result" : true
	} ];
	
	var truthtable = [ {
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
	
	var evalutor = new PostfixEvaluator();
	evalutor.setTruthTable(truthtable);
	evalutor.evaluate("a b =>");
	
	var evalutedTruthtable = evalutor.getTruthTable();
	var ok = compareArrayOfAssocArray(expectedEvaluteTruthtable, evalutedTruthtable);
	
	assert.ok(ok, "result of (a b => )are equal as "+ JSON.stringify(expectedEvaluteTruthtable));
});

QUnit.test("evaluate postfix: (a b <=>)", function(assert) {
	var expectedEvaluteTruthtable = [ {
		"a" : true,
		"b" : true,
		"result" : true
	}, {
		"a" : true,
		"b" : false,
		"result" : false
	}, {
		"a" : false,
		"b" : true,
		"result" : false
	}, {
		"a" : false,
		"b" : false,
		"result" : true
	} ];
	
	var truthtable = [ {
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
	
	var evalutor = new PostfixEvaluator();
	evalutor.setTruthTable(truthtable);
	evalutor.evaluate("a b <=>");
	
	var evalutedTruthtable = evalutor.getTruthTable();
	var ok = compareArrayOfAssocArray(expectedEvaluteTruthtable, evalutedTruthtable);
	
	assert.ok(ok, "result of (a b <=> )are equal as "+ JSON.stringify(expectedEvaluteTruthtable));
});