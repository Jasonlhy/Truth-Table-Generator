/** This file is written with following purposes
 *  - Without jQuery
 *  - Use JS Standard, https://standardjs.com/
 *  - Use ES5, ES6 feature if possible
 *      - Array.from, Array.filter, map, reduce
 *      - ES6 module, arrow function, Set
 *      - ES6 class and ES6 function property
 *      - ES6 Symbol for avoiding magic string
 *  - Avoid string concatenation of HTML
 */

/**
 * Convert notation into postfix expression
 */
export class NotationConverter {
  /**
     *
     */
  constructor () {
    this.keywords = ['and', 'or', 'not', '=>', '<=>']
  }

  isKeywords (word) {
    const result = this.keywords.indexOf(word) !== -1
    if (result) { console.log('found keyword : ' + word) }

    return result
  }

  /**
     * Get variable list inside a postfix expression
     *
     * @param {String} postfixExpression - post fix expression string, e.g. "a b and"
     * @returns Array array of variable name, e.g. ["a", "b"]
     */
  getVariableList (postfixExpression) {
    const tokens = postfixExpression.split(' ')
    const keyWordTokens = tokens.filter(t => !this.isKeywords(t))
    return Array.from(new Set(keyWordTokens).values())
  }

  /**
     * Get the precedence of operator, lowest number = higher precedence
     *
     * @param {string} operator
     * @returns
     */
  static getPrecedence (operator) {
    let precedence
    switch (operator) {
      case 'not':
        precedence = 1
        break
      case 'and':
        precedence = 2
        break
      case 'or':
        precedence = 3
        break
      case '=>':
        precedence = 4
        break
      case '<=>':
        precedence = 5
        break
      default:
        precedence = 99 // this is for (....
        break
    }

    return precedence
  }

  /**
     *
     *
     * @param {string} operatorA
     * @param {string} operatorB
     * @returns
     */
  static isHigherPrecedence (operatorA, operatorB) {
    return NotationConverter.getPrecedence(operatorA) < NotationConverter.getPrecedence(operatorB)
  }

  /**
     * Convert a infix expression into a postfix expression
     *
     * @param {string} infixExpression - "a and b"
     * @returns {string} postfix expression - "a b and"
     */
  convert (infixExpression) {
    let postfix = ''
    const pattern = /([() ])/g
    const arrayStrings = infixExpression.split(pattern)

    /**
         *
         *
         * @param {any} element
         * @returns
         */
    const arrayWithoutSpace = arrayStrings.filter(function (element) {
      return element !== ' ' && element !== ''
    })
    const stack = []

    for (let i = 0; i < arrayWithoutSpace.length; i++) {
      let token = arrayWithoutSpace[i]

      // the keywords?
      if (this.isKeywords(token)) {
        // push into stack if empty
        if (stack.length === 0) {
          stack.push(token)
        } else {
          // pop the higher precedence to the postfix string
          // so that they can be processed first in evaluation
          while (stack.length > 0) {
            let top = stack[stack.length - 1]

            if (NotationConverter.isHigherPrecedence(top, token)) {
              postfix += stack.pop() + ' '
            } else {
              break
            }
          }

          stack.push(token)
        }
      } else if (token === '(') {
        stack.push(token)
      } else if (token === ')') {
        while (stack.length > 0) {
          let top = stack[stack.length - 1]
          if (top === '(') {
            stack.pop()
            break
          } else {
            postfix += stack.pop() + ' '
          }
        }
      } else { // variable
        postfix += token + ' '
        console.log('put number into string : ' + token)
      }
    }

    // pop the remaining operator
    while (stack.length > 0) {
      postfix += stack.pop() + ' '
    }

    return postfix.trim()
  }
}

export class TruthTableGenerator {
  /**
     * Generate a truth table with every condition
     *
     * @param {Array} variableList - variableList variable list for the variable in the truth table, e.g. ["a","b"]
     * @returns Array truth table. [{"a":true, "b":true} , {"a":false, "b":false}]
     */
  static generate (variableList) {
    const count = variableList.length
    const lastIndex = count - 1
    const totalRow = Math.pow(2, count)

    const truthTable = []
    for (let rowIndex = 0; rowIndex < totalRow; rowIndex++) {
      let row = []

      for (let columnIndex = 0; columnIndex < variableList.length; columnIndex++) {
        // the longest true-true or true-true-true-true, false-false, false-false-false-false pair along the y axis in a column
        let numberOfPair = Math.pow(2, lastIndex - columnIndex)
        let trueFalseSectionIndex = parseInt(rowIndex / numberOfPair)
        row[variableList[columnIndex]] = trueFalseSectionIndex % 2 === 0
      }
      truthTable.push(row)
    }

    return truthTable
  }
}

export class PostfixEvaluator {
  /**
     *
     *
     * @param {Array} truthTable
     */
  setTruthTable (truthTable) {
    this.truthtable = truthTable
  }

  /**
     *
     *
     * @returns
     */
  getTruthTable () {
    return this.truthtable
  }

  /**
     * Evaluate result for a row on the truth table
     *
     * @param {Array} tokenArray - The post fix evaluation token to be evaluate, e.g. ["a", "not", "b", "and"]
     * @param {any} row - The value of a and b on a row of truth table, e.g. ["a":true, "b":false]
     * @returns The result of the post fix evaluation on that row
     */
  evaluateRow (tokenArray, row) {
    const stack = []
    let result
    let valA
    let valB

    tokenArray.forEach(function (element) {
      stack.push(element)

      const token = stack.pop()
      if (token === 'not') {
        valB = stack.pop()
        result = !valB
      } else if (token === 'or') {
        valB = stack.pop()
        valA = stack.pop()
        result = valA || valB
      } else if (token === 'and') {
        valB = stack.pop()
        valA = stack.pop()
        result = valA && valB
      } else if (token === '=>') {
        valB = stack.pop()
        valA = stack.pop()
        result = !(valA && !valB) // only (A = T, B = F) will be false, so not them => true
      } else if (token === '<=>') {
        valB = stack.pop()
        valA = stack.pop()
        result = valA === valB
      } else { // variable
        result = row[element]
      }
      stack.push(result)
    })

    return stack.pop()
  }

  /**
     * Evaluate the postfix expression. The evaluation result will be stored at "result" of each row object
     * @param postfixExpression
     */
  evaluate (postfixExpression) {
    const tokenArray = postfixExpression.split(' ')
    const truthTable = this.getTruthTable()

    for (let rowIndex = 0; rowIndex < truthTable.length; rowIndex++) {
      let row = truthTable[rowIndex]
      truthTable[rowIndex]['result'] = this.evaluateRow(tokenArray, row)
    }
  }
}

// TODO don't use static due to arrow function can't access static method with ease
export class TruthTableUI {
  /**
     * Generate a truth table inside a div
     *
     * @param {String} infixInput - infix formula string
     * @param {Element} outputDiv
     * @param {String} generatedTableId - the table id to be generated
     * @param {Symbol} format - the representation format of the cell value
     *
     */
  static generate (infixInput, outputDiv, generatedTableId, format) {
    // convert infix from postfix to infix
    // and get the variable list
    const converter = new NotationConverter()
    const postfix = converter.convert(infixInput)
    const variableList = converter.getVariableList(postfix)

    // generate true and false table
    const truthTable = TruthTableGenerator.generate(variableList)

    // evaluate the result
    const evaluator = new PostfixEvaluator()
    evaluator.setTruthTable(truthTable)
    evaluator.evaluate(postfix)

    // generate the UI
    const resultTruthTable = evaluator.getTruthTable()

    const table = document.createElement('table')
    table.classList.add('table', 'table-bordered', 'table-hover', 'text-center')
    table.id = generatedTableId

    // thead
    const tableHeader = document.createElement('thead')
    table.appendChild(tableHeader)

    const tableHeaderRow = document.createElement('tr')
    tableHeader.appendChild(tableHeaderRow)
    variableList
      .map((variable) =>
        TruthTableUI.CreateTextElement('th', variable, 'text-center'))
      .forEach((th) => {
        tableHeaderRow.appendChild(th)
      })
    tableHeaderRow.appendChild(this.CreateTextElement('th', infixInput, 'text-center'))

    // Use fragment?
    // tbody
    const tableBody = document.createElement('tbody')
    table.appendChild(tableBody)

    const tableRows = resultTruthTable.map((row) => {
      const columns = Object.keys(row).map(function (key) {
        const value = TruthTableUI.extractValueInRow(format, row, key)
        return TruthTableUI.CreateTextElement('td', value, 'text-center')
      })

      const tr = document.createElement('tr')
      columns.forEach((td) => {
        tr.appendChild(td)
      })

      return tr
    })
    tableRows.forEach(tr => {
      tableBody.appendChild(tr)
    })

    // console.log('table: ', table);

    if (!outputDiv) {
      console.warn('Output div should exists')
    } else {
      outputDiv.insertBefore(table, outputDiv.firstChild)
    }

    return table
  }

  /**
      * Generate <{tagName} class="{className}">{text}</{tagName}>
      *
      * @param tagName
      * @param text
      * @param className
      * @returns {HTMLElement}
      * @constructor
      */
  static CreateTextElement (tagName, text, className) {
    const element = document.createElement(tagName)
    if (className) {
      element.classList.add(className)
    }

    const textNode = document.createTextNode(text)
    element.appendChild(textNode)

    return element
  }

  /**
     * Extract value in row
     *
     * @param {Symbol} format
     * @param {Object} row
     * @param {string} key
     * @returns {string}
     */
  static extractValueInRow (format, row, key) {
    if (!row.hasOwnProperty(key)) {
      console.warn('Row do not have key')
      return undefined
    }

    switch (format) {
      case TruthTableUI.FORMAT_TRUE_FALSE:
        return row[key]
      case TruthTableUI.FORMAT_T_F:
        return row[key] ? 'T' : 'F'
      case TruthTableUI.FORMAT_DIGIT:
        return row[key] ? '1' : '0'
      default:
        console.warn('Invalid symbol')
        return undefined
    }
  }
}

/* Static Field, ES6 only allows property (a.k.a getter method) */
/**
 * true, false
 *
 * @type {symbol}
 */
TruthTableUI.FORMAT_TRUE_FALSE = Symbol('true, false')

/**
 * 'UPPER_LETTER' - T, F
 *
 * @type {symbol}
 */
TruthTableUI.FORMAT_T_F = Symbol('T, F')

/**
 * 'DIGIT' - 1, 0
 *
 * @type {symbol}
 */
TruthTableUI.FORMAT_DIGIT = Symbol('1, 0')
