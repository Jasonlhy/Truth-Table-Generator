/**
 * 
 */
function NotationConverter() { }
NotationConverter.prototype = {
	"keywords": ["and", "or", "not", "=>", "<=>"],
	"isKeywords": function (word) {
		var result = this.keywords.indexOf(word) !== -1;
		if (result)
			console.log("found keyword : " + word);

		return result;
	},

	/**
	 * Get variable list inside a postfix expression
	 * 
	 * @param {String} postfixExpression - post fix expression string, e.g. "a b and"
	 * @returns an array of variable name, e.g. ["a", "b"]
	 */
	"getVariableList": function (postfixExpression) {
		var tokens = postfixExpression.split(" ");
		var theConverter = this;

		var set = [];
		tokens.forEach(function (element) {
			if (!theConverter.isKeywords(element)) {
				set[element] = true;
			}
		});

		var list = [];
		for (var variableAsKey in set) {
			list.push(variableAsKey);
		}

		return list;
	},

	/**
	 * Get the precedence of operator, lowest number = higher precedence
	 *
	 * @param {String} operator
	 * @returns
	 */
	"getPrecedence": function (operator) {
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
	},

	/**
	 * 
	 * 
	 * @param {any} operatorA
	 * @param {any} operatorB
	 * @returns
	 */
	"isHigherPrecedence": function (operatorA, operatorB) {
		var higherPrecedenceResult;

		higherPrecedenceResult = this.getPrecedence(operatorA) < this.getPrecedence(operatorB);

		return higherPrecedenceResult;
	},

	/**
	 * Convert a infix expression into a postfix expression
	 * 
	 * @param {String} infixExpression - "a and b"
	 * @returns a postfix expression - "a b and"
	 */
	"convert": function (infixExpression) {
		var postfix = "";
		var pattern = /(\(|\)| )/g;
		var arrayStrings = infixExpression.split(pattern);
		/**
		 * 
		 * 
		 * @param {any} element
		 * @returns
		 */
		var arrayWithoutSpace = arrayStrings.filter(function (element) {
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
			} else if (token === ')') {
				while (stack.length > 0) {
					var top = stack[stack.length - 1];
					if (top === '(') {
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
	}
};

/**
 * Generate template of truth table without result
 */
function TruthtableGenerator() { }
TruthtableGenerator.prototype = {
	/**
	 * Generate a truth table with every condition
	 * 
	 * @param {Array} variableList - variableList variable list for the variable in the truth table, e.g. ["a","b"]
	 * @returns a truth table. [{"a":true, "b":true} , {"a":false, "b":false}]
	 */
	"generate": function (variableList) {
		var count = variableList.length;
		var lastIndex = count - 1;
		var totalRow = Math.pow(2, count);

		var numberOfPair; // the longest true-true or true-true-true-true, false-false, false-false-false-false pair along the y axis in a column
		var cellValue;

		var truthtable = [];
		for (var rowIndex = 0; rowIndex < totalRow; rowIndex++) {
			var row = [];
			for (var columnIndex = 0; columnIndex < variableList.length; columnIndex++) {
				numberOfPair = Math.pow(2, lastIndex - columnIndex);
				var trueFalseSectionIndex = parseInt(rowIndex / numberOfPair);
				cellValue = trueFalseSectionIndex % 2 === 0;

				row[variableList[columnIndex]] = cellValue;
			}
			truthtable.push(row);
		}

		return truthtable;
	}
};


/**
 * Evaluator that evaluate a truth table with result
 */
function PostfixEvalutor() { }
PostfixEvalutor.prototype = {
	/**
	 * 
	 *  
	 * @param {any} truthtable
	 */
	"setTruthtable": function (truthtable) {
		this.truthtable = truthtable;
	},

	/**
	 * 
	 * 
	 * @returns
	 */
	"getTruthtable": function () {
		return this.truthtable;
	},

	/**
	 * Evaluate result for a row on the truth table
	 * 
	 * @param {any} tokenArray - The post fix evaluation token to be evaluted, e.g. ["a", "not", "b", "and"]
	 * @param {any} row - The value of a and b on a row of truth table, e.g. ["a":true, "b":false]
	 * @returns The result of the post fix evaluation on that row
	 */
	"evaluteRow": function (tokenArray, row) {
		var stack = [];
		var result;
		var valA;
		var valB;

		tokenArray.forEach(function (element) {
			stack.push(element);

			var token = stack.pop();
			if (token === "not") {
				valB = stack.pop();
				result = !valB
			} else if (token === "or") {
				valB = stack.pop();
				valA = stack.pop();
				result = valA || valB;
			} else if (token === "and") {
				valB = stack.pop();
				valA = stack.pop();
				result = valA && valB;
			} else if (token === "=>") {
				valB = stack.pop();
				valA = stack.pop();
				result = !(valA && !valB);  // only (A = T, B = F) will be false, so not them => true
			}
			else if (token === "<=>") {
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
	},

	/**
	 * Evaludate the postfix expression. The evaluation result will be stored at "result" of each row object
	 * @param {String} postfix Expression - Post fix expression string, e.g. "a b and"
	 */
	"evalute": function (postfixExpression) {
		var tokenArray = postfixExpression.split(" ");
		var row;
		var truthtable = this.getTruthtable();

		for (var rowIndex = 0; rowIndex < truthtable.length; rowIndex++) {
			row = truthtable[rowIndex];
			var result = this.evaluteRow(tokenArray, row);
			truthtable[rowIndex]["result"] = result;
		}
	}
};



function TruthtableUI() { }
TruthtableUI.prototype = {
	/**
	 * Generate a truth table inside a div
	 *
	 * 
	 * 
	 * @param {String} infixInput - infix formula string
	 * @param {String} outputDiv - the id of the div
	 * @param {String} generatedTableId - the table id to be generated
	 * @param {any} format - the representation format of the cell value
	 * 				format parameter - representation format:
	 * 				undefined - true, false
	 * 				'UPPER_LETTER' - T, F
	 * 				'DIGIT' - 1, 0
	 */
	"generate": function (infixInput, outputDiv, generatedTableId, format) {

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

		// generate the UI
		var resultTruthtable = evalutor.getTruthtable();
		var tableContent = '<table class="table table-bordered table-hover text-center" id="' + generatedTableId + '" >';
		tableContent += '<thead><tr>'
		for (var i = 0; i < variableList.length; i++) {
			tableContent += '<th class="text-center">' + variableList[i] + '</th>';
		}
		tableContent += '<th class="text-center">' + infixInput + '</th>';
		tableContent += '</tr></thead>';

		tableContent += '<tbody>';
		for (var i = 0; i < resultTruthtable.length; i++) {
			var row = resultTruthtable[i];
			tableContent += '<tr>'
			for (var key in row) {
				// value in table cell
				var value;
				if (format == 'undefined' || format === undefined) {
					value = row[key];
				} else if (format === 'UPPER_LETTER') {
					value = (row[key] === true) ? 'T' : 'F';
				} else if (format === 'DIGIT') {
					value = (row[key] === true) ? '1' : '0';
				}

				tableContent += '<td>' + value + '</td>';
			}
			tableContent += '</tr>';
		}
		tableContent += '</tbody>';
		tableContent += '</table>';

		document.getElementById(outputDiv).innerHTML = tableContent;
	}
};