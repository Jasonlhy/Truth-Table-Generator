QUnit.test( "hello world", function( assert  ) {
	  assert.ok( 1 == '1', "Passed! with result: "  );
} );

/**
 * Simple test and, or
 */
QUnit.test( "infix: (a and c) to postfix", function( assert  ) {
	var infixInput = 'a and c';
	var expectedPostfix = 'a c and';
	
	var converter = new NotationConverter();  
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );

QUnit.test( "infix: (a or c) to postfix", function( assert  ) {
	var infixInput = 'a or c';
	var expectedPostfix = 'a c or';
	
	var converter = new NotationConverter();  
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );

/**
 * Testing includes not, and operation
 */ 
QUnit.test( "infix: (a and not c) to postfix", function( assert  ) {
	var infixInput = 'a and not c';
	var expectedPostfix = 'a c not and';
	
	var converter = new NotationConverter();
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );

QUnit.test( "infix: (not a and c) to postfix", function( assert  ) {
	var infixInput = 'not a and c';
	var expectedPostfix = 'a not c and';
	
	var converter = new NotationConverter();
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );

QUnit.test( "infix: (not a and not c) to postfix", function( assert  ) {
	var infixInput = 'not a and not c';
	var expectedPostfix = 'a not c not and';
	
	var converter = new NotationConverter();
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );

/**
 * Testing includes not, or operation
 */ 
QUnit.test( "infix: (a or not c) to postfix", function( assert  ) {
	var infixInput = 'a or not c';
	var expectedPostfix = 'a c not or';
	
	var converter = new NotationConverter();
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );

QUnit.test( "infix: (not a or c) to postfix", function( assert  ) {
	var infixInput = 'not a or c';
	var expectedPostfix = 'a not c or';
	
	var converter = new NotationConverter();
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );

QUnit.test( "infix: (not a or not c) to postfix", function( assert  ) {
	var infixInput = 'not a or not c';
	var expectedPostfix = 'a not c not or';
	
	var converter = new NotationConverter();
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );

/**
 * Testing includes not, or, and operation with precedence problem
 */ 
QUnit.test( "infix: (a or not c and b) to postfix", function( assert  ) {
	var infixInput = 'a or not c and b';
	var expectedPostfix = 'a c not b and or';
	
	var converter = new NotationConverter();
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );

QUnit.test( "infix: (not a or not c or b and d) to postfix", function( assert  ) {
	var infixInput = 'not a or not c or b and d';
	var expectedPostfix = 'a not c not b d and or or';
	
	var converter = new NotationConverter();
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );

/**
 * Testing includes bucket with spaces for separation
 */ 
QUnit.test( "infix: ( a or b ) to postfix", function( assert  ) {
	var infixInput = '( a or b )';
	var expectedPostfix = 'a b or';
	
	var converter = new NotationConverter();
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );

QUnit.test( "infix: ( a and ( b or c ) )to postfix", function( assert  ) {
	var infixInput = 'a and ( b or c )';
	var expectedPostfix = 'a b c or and';
	
	var converter = new NotationConverter();
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );

/**
 * Testing buckets without space
 */
QUnit.test( "infix: ( ( a and c ) )to postfix", function( assert  ) {
	var infixInput = '( a and c )';
	var expectedPostfix = 'a c and';
	
	var converter = new NotationConverter();
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );

QUnit.test( "infix: ( (a and c ) )to postfix", function( assert  ) {
	var infixInput = '(a and c )';
	var expectedPostfix = 'a c and';
	
	var converter = new NotationConverter();
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );

QUnit.test( "infix: ( (a and c ) )to postfix", function( assert  ) {
	var infixInput = '( a and c)';
	var expectedPostfix = 'a c and';
	
	var converter = new NotationConverter();
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );

QUnit.test( "infix: ( (a and c ) )to postfix", function( assert  ) {
	var infixInput = '(a and c)';
	var expectedPostfix = 'a c and';
	
	var converter = new NotationConverter();
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );

/**
* Test implies...
*/
QUnit.test( "infix: ( a => c )to postfix", function( assert  ) {
	var infixInput = '(a => c)';
	var expectedPostfix = 'a c =>';
	
	var converter = new NotationConverter();
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );

QUnit.test( "infix: ( a => b or c)to postfix", function( assert  ) {
	var infixInput = '(a => b or c)';
	var expectedPostfix = 'a b c or =>';
	
	var converter = new NotationConverter();
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );

QUnit.test( "infix: ( a => b and c)to postfix", function( assert  ) {
	var infixInput = '(a => b and c)';
	var expectedPostfix = 'a b c and =>';
	
	var converter = new NotationConverter();
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );

QUnit.test( "infix: ( a => not b )to postfix", function( assert  ) {
	var infixInput = '(a => not b)';
	var expectedPostfix = 'a b not =>';
	
	var converter = new NotationConverter();
	var result = converter.convert(infixInput);
	
	assert.ok( result === expectedPostfix, "ExepctedPostfix: " + expectedPostfix +" Result: "+ result );
} );