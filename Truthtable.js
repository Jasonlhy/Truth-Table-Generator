/**
 * 
 */
function NotationConverter() {}
NotationConverter.prototype = new Object();
NotationConverter.prototype.keywords = [ "and", "or", "not", "=>", "<=>" ];

NotationConverter.prototype.isKeywords = function(word) {
	var result = this.keywords.indexOf(word) !== -1;
	if (result)
		console.log("found keyword : " + word);
		
	return result;
};

NotationConverter.prototype.getVariableList = function(postfixExpression) {
	var tokens = postfixExpression.split(" ");
	var theConverter = this;

	var set = [];
	tokens.forEach(function(element) {
		if (!theConverter.isKeywords(element)) {
			set[element] = true;
		}
	});

	var list = [];
	for (var variableAsKey in set) {
		list.push(variableAsKey);
	}

	return list;
}

// lowest number = higher precedence...
NotationConverter.prototype.getPrecedence = function(operator) {
	var precedence;
	switch (operator) {
	case "not":
		precedence = 1;
		break;
	case "and":
		precedence = 2;
		break;
	case "or":
		precedence = 3;
		break;
	case "=>":
		precedence = 4;
		break;
	case "<=>":
		precedence = 5;
		break;
	default:
		precedence = 99; // this is for (....
		break;
	}

	return precedence;
};

NotationConverter.prototype.isHigherPrecedence = function(operatorA, operatorB) {
	var higherPrecedenceResult;

	higherPrecedenceResult = this.getPrecedence(operatorA) < this
			.getPrecedence(operatorB);

	// return (higherPrecedenceResult > 0)
	return higherPrecedenceResult;
};

NotationConverter.prototype.convert = function(infixExpression) {
	var postfix = "";
	var pattern = /(\(|\)| )/g;
	var arrayStrings = infixExpression.split(pattern);
	var arrayWithoutSpace = arrayStrings.filter(function(element){
		return element != ' ' && element != "";
	});
	var stack = [];

	for (var i = 0; i < arrayWithoutSpace.length; i++) {
		var token = arrayWithoutSpace[i];
		console.log("token: " + token);

		// the keywords?
		if (this.isKeywords(token)) {
			// push into stack if empty
			if (stack.length == 0) {
				stack.push(token);
			} else {
				// pop the higher precedence to the postfix string
				// so that they can be processed first in evaluation
				while (stack.length > 0) {
					var top = stack[stack.length - 1];
					console.log("testing top: " + top + " & " + token);
					if (this.isHigherPrecedence(top, token)) {
						postfix += stack.pop() + " ";
						console.log(top + " has higher precedence than "
								+ token + " pop & added to string");
					} else {
						break;
					}
				}

				stack.push(token);
			}

		} else if (token === '(') { 
			stack.push(token);
		} else if (token === ')'){
			while (stack.length > 0){
				var top = stack[stack.length -1];
				if (top === '('){
					stack.pop();
					break;
				} else {
					postfix += stack.pop() + " ";
				}
			}
		} else { // variable
			postfix += token + " ";
			console.log("put number into string : " + token);
		}
	}

	// pop the remaining operator
	while (stack.length > 0) {
		postfix += stack.pop() + " ";
	}

	// for (var i = 0; i < arrayStrings.length; i++)
	// postfix += arrayStrings[i] + " / ";

	return postfix.trim();
};


/**
 * Generate template of truth table without result
 */
function TruthtableGenerator(){
	
} 
/**
 *  
 * @param variableList variable list for the variable in the truth table, e.g. ["a","b"]
 * @return generate a truth table. [{"a":true, "b":true} , {"a":false, "b":false}];
 */
TruthtableGenerator.prototype.generate = function(variableList){
	var count = variableList.length;
	var lastIndex = count - 1;
	var totalRow = Math.pow(2, count);
	
	var numberOfPair; // the longest true-true or true-true-true-true, false-false, false-false-false-false pair along the y axis in a column
	var cellValue;
	
	var truthtable = [];
	for (var rowIndex = 0; rowIndex < totalRow ; rowIndex++){
		var row = [];
		for (var columnIndex = 0; columnIndex < variableList.length; columnIndex++){
			numberOfPair = Math.pow(2, lastIndex - columnIndex);
			var trueFalseSectionIndex = parseInt(rowIndex / numberOfPair);
			cellValue = trueFalseSectionIndex % 2 === 0;
			
			row[ variableList[columnIndex] ] = cellValue; 
		}
		truthtable.push(row);
	}
	
	return truthtable;
};


/**
 * 
 */
// Evaluator
function PostfixEvalutor() {
}
PostfixEvalutor.prototype = new Object();
PostfixEvalutor.prototype.setTruthtable = function(truthtable) {
	this.truthtable = truthtable;
};
PostfixEvalutor.prototype.getTruthtable = function() {
	return this.truthtable;
};

// tokenArray = ["a", "not", "b", "and"]
// row = ["a":true, "b":false]
PostfixEvalutor.prototype.evaluteRow = function(tokenArray, row) {
	var stack = [];
	var result;
	var valA;
	var valB;

	tokenArray.forEach(function(element) {
		console.log("pushing postfix token: " + element);
		stack.push(element);

		var token = stack.pop();
		console.log("poping token: " + token);
		if (token === "not") {
			valB = stack.pop();
			console.log("valB in not " + valB);
			result = !valB
		} else if (token === "or") {
			valB = stack.pop();
			valA = stack.pop();
			result = valA || valB;
		} else if (token === "and") {
			valB = stack.pop();
			valA = stack.pop();
			result = valA && valB;
		} else if (token === "=>"){
			valB = stack.pop();
			valA = stack.pop();
			result = !(valA && !valB);  // only (A = T, B = F) will be false, so not them => true
		}
		else if (token === "<=>" ) {
			valB = stack.pop();
			valA = stack.pop();
			result = valA === valB;
		}
		else { // variable
			result = row[element];
		}
		stack.push(result);
	});

	return stack.pop();
};
PostfixEvalutor.prototype.evalute = function(postfixExpression) {
	var tokenArray = postfixExpression.split(" ");
	var row;
	var truthtable = this.getTruthtable();

	for (var rowIndex = 0; rowIndex < truthtable.length; rowIndex++) {
		row = truthtable[rowIndex];
		var result = this.evaluteRow(tokenArray, row);
		truthtable[rowIndex]["result"] = result;
	}
}

/**
 * 
 * infixInput : infix formula string
 * outputDiv : the id of the div
 * generatedTableId : the table id to be generated
 * format : the representation format of the cell value
 *      undefined : true, false
 *      'UPPER_LETTER' : T, F
 *      'DIGIT' : 1, 0
 */
function TruthtableUI(){}
TruthtableUI.prototype.generate = function(infixInput, outputDiv, generatedTableId, format){		
	
	// convert infix from postfix to infix
	// and get the variablelist
	var converter = new NotationConverter();
	var postfix = converter.convert(infixInput);
	var variableList = converter.getVariableList(postfix);
	
	// generate true and false table
	var truthtableGenerator = new TruthtableGenerator();
	var truthtable = truthtableGenerator.generate(variableList);
	
	// evalute the result
	var evalutor = new PostfixEvalutor();
	evalutor.setTruthtable(truthtable);
	evalutor.evalute(postfix);
	
	var resultTruthtable = evalutor.getTruthtable();
	
	var tableContent = '<table class="table table-bordered table-hover text-center" id="' +generatedTableId + '" >';
	tableContent += '<thead><tr>'
	for (var i = 0; i < variableList.length; i++){
		tableContent += '<th class="text-center">' + variableList[i] + '</th>'; 
	}
	tableContent += '<th class="text-center">' + infixInput + '</th>';
	tableContent += '</tr></thead>';
	
	tableContent += '<tbody>';
	for (var i = 0; i < resultTruthtable.length; i++){
		var row = resultTruthtable[i];
		tableContent += '<tr>'
		for (var key in row){
            // value in table cell
            var value;
            if (format == 'undefined' || format === undefined){
                value = row[key];
            } else if (format === 'UPPER_LETTER'){
                value = (row[key] === true) ? 'T' : 'F';
            } else if (format === 'DIGIT'){
                value = (row[key] === true) ? '1' : '0';
            }
            
			tableContent += '<td>' + value + '</td>';	
		}
		tableContent += '</tr>';
	}
	tableContent += '</tbody>';
	tableContent += '</table>';
	//alert(tableContent);
	
	document.getElementById(outputDiv).innerHTML = tableContent;
}
