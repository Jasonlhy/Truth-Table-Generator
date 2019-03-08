class NotationConverter {
    /**
     *
     */
    constructor() {
        this.keywords = ["and", "or", "not", "=>", "<=>"];
    }

    isKeywords(word) {
        var result = this.keywords.indexOf(word) !== -1;
        if (result)
            console.log("found keyword : " + word);

        return result;
    }

    /**
     * Get variable list inside a postfix expression
     *
     * @param {String} postfixExpression - post fix expression string, e.g. "a b and"
     * @returns Array array of variable name, e.g. ["a", "b"]
     */
    getVariableList(postfixExpression) {
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
    }

    /**
     * Get the precedence of operator, lowest number = higher precedence
     *
     * @param {String} operator
     * @returns
     */
    static getPrecedence(operator) {
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
    }

    /**
     *
     *
     * @param {any} operatorA
     * @param {any} operatorB
     * @returns
     */
    static isHigherPrecedence(operatorA, operatorB) {
        var higherPrecedenceResult;

        higherPrecedenceResult = NotationConverter.getPrecedence(operatorA) < NotationConverter.getPrecedence(operatorB);

        return higherPrecedenceResult;
    }

    /**
     * Convert a infix expression into a postfix expression
     *
     * @param {String} infixExpression - "a and b"
     * @returns string postfix expression - "a b and"
     */
    convert(infixExpression) {
        var postfix = "";
        var pattern = /([() ])/g;
        var arrayStrings = infixExpression.split(pattern);

        /**
         *
         *
         * @param {any} element
         * @returns
         */
        var arrayWithoutSpace = arrayStrings.filter(function (element) {
            return element !== ' ' && element !== "";
        });
        var stack = [];

        for (let i = 0; i < arrayWithoutSpace.length; i++) {
            let token = arrayWithoutSpace[i];

            // the keywords?
            if (this.isKeywords(token)) {
                // push into stack if empty
                if (stack.length === 0) {
                    stack.push(token);
                } else {
                    // pop the higher precedence to the postfix string
                    // so that they can be processed first in evaluation
                    while (stack.length > 0) {
                        let top = stack[stack.length - 1];
                        console.log("testing top: " + top + " & " + token);
                        if (NotationConverter.isHigherPrecedence(top, token)) {
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
                    let top = stack[stack.length - 1];
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

        return postfix.trim();
    }
}


class TruthTableGenerator {
    /**
     * Generate template of truth table without result
     */
    constructor() {
    }

    /**
     * Generate a truth table with every condition
     *
     * @param {Array} variableList - variableList variable list for the variable in the truth table, e.g. ["a","b"]
     * @returns Array truth table. [{"a":true, "b":true} , {"a":false, "b":false}]
     */
    static generate(variableList) {
        var count = variableList.length;
        var lastIndex = count - 1;
        var totalRow = Math.pow(2, count);

        var truthTable = [];
        for (let rowIndex = 0; rowIndex < totalRow; rowIndex++) {
            let row = [];

            for (let columnIndex = 0; columnIndex < variableList.length; columnIndex++) {
                // the longest true-true or true-true-true-true, false-false, false-false-false-false pair along the y axis in a column
                let numberOfPair = Math.pow(2, lastIndex - columnIndex);
                let trueFalseSectionIndex = parseInt(rowIndex / numberOfPair);
                row[variableList[columnIndex]] = trueFalseSectionIndex % 2 === 0;
            }
            truthTable.push(row);
        }

        return truthTable;
    }
}


class PostfixEvaluator {
    /**
     * Evaluator that evaluate a truth table with result
     */
    constructor() {
    }

    /**
     *
     *
     * @param {Array} truthTable
     */
    setTruthTable(truthTable) {
        this.truthtable = truthTable;
    }

    /**
     *
     *
     * @returns
     */
    getTruthTable() {
        return this.truthtable;
    }

    /**
     * Evaluate result for a row on the truth table
     *
     * @param {any} tokenArray - The post fix evaluation token to be evaluted, e.g. ["a", "not", "b", "and"]
     * @param {any} row - The value of a and b on a row of truth table, e.g. ["a":true, "b":false]
     * @returns The result of the post fix evaluation on that row
     */
    evaluateRow(tokenArray, row) {
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
            } else if (token === "<=>") {
                valB = stack.pop();
                valA = stack.pop();
                result = valA === valB;
            } else { // variable
                result = row[element];
            }
            stack.push(result);
        });

        return stack.pop();
    }

    /**
     * Evaludate the postfix expression. The evaluation result will be stored at "result" of each row object
     * @param postfixExpression
     */
    evaluate(postfixExpression) {
        const tokenArray = postfixExpression.split(" ");
        const truthTable = this.getTruthTable();

        for (let rowIndex = 0; rowIndex < truthTable.length; rowIndex++) {
            let row = truthTable[rowIndex];
            truthTable[rowIndex]["result"] = this.evaluateRow(tokenArray, row);
        }
    }
}


class TruthTableUI {
    constructor() {
    }

    /**
     * Generate a truth table inside a div
     *
     *
     *
     * @param {String} infixInput - infix formula string
     * @param {String} outputDiv - the id of the div
     * @param {String} generatedTableId - the table id to be generated
     * @param {any} format - the representation format of the cell value
     *                format parameter - representation format:
     *                undefined - true, false
     *                'UPPER_LETTER' - T, F
     *                'DIGIT' - 1, 0
     */
    static generate(infixInput, outputDiv, generatedTableId, format) {
        // convert infix from postfix to infix
        // and get the variablelist
        var converter = new NotationConverter();
        var postfix = converter.convert(infixInput);
        var variableList = converter.getVariableList(postfix);

        // generate true and false table
        var truthTable = TruthTableGenerator.generate(variableList);

        // evaluate the result
        var evaluator = new PostfixEvaluator();
        evaluator.setTruthTable(truthTable);
        evaluator.evaluate(postfix);

        // generate the UI
        var resultTruthtable = evaluator.getTruthTable();
        var tableContent = '<table class="table table-bordered table-hover text-center" id="' + generatedTableId + '" >';
        tableContent += '<thead><tr>';
        for (let i = 0; i < variableList.length; i++) {
            tableContent += '<th class="text-center">' + variableList[i] + '</th>';
        }
        tableContent += '<th class="text-center">' + infixInput + '</th>';
        tableContent += '</tr></thead>';

        tableContent += '<tbody>';
        for (let i = 0; i < resultTruthtable.length; i++) {
            var row = resultTruthtable[i];
            tableContent += '<tr>';

            for (var key in row) {
                // value in table cell
                var value;
                if (format === 'undefined' || format === undefined) {
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
}
