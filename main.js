const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator-keys')
const display = calculator.querySelector('.calculator-display')

keys.addEventListener('click', event => {
	if(!event.target.closest('button')) return

	const key = event.target
	const keyValue = key.textContent
	const displayValue = display.textContent
	const { type } = key.dataset
	//type is now destructured
	const { previousKeyType } = calculator.dataset

	if(type === 'number') {
		if(displayValue === '0'|| previousKeyType === 'operator') {
			display.textContent = keyValue
		} else {
			display.textContent = displayValue + keyValue
		}
	}

	if(type === 'operator') {
		const operatorKeys = keys.querySelectorAll('[data-type="operator"]')
		operatorKeys.forEach(el => {el.dataset.state = ''})
			// could also use:
		// const currentActiveOperator = calculator.querySelector('[data-state="selected"]')
		// if (currentActiveOperator) {
		// 	currentActiveOperator.dataset.state =''
		// }
		key.dataset.state = 'selected'

		calculator.dataset.firstNumber = displayValue
		calculator.dataset.operator = key.dataset.key
	}

	if(type === 'equal') {
		// perform calculation
		const firstNumber = calculator.dataset.firstnumber
		const operator = calculator.dataset.operator
		const secondNumber = displayValue
		display.textContent = calculate(firstNumber, operator, secondNumber)
	}

	if(type === 'clear') {
		display.textContent = '0'
		delete calculator.dataset.firstNumber
		delete calculator.dataset.secondNumber
	}

	// to reset the value
	calculator.dataset.previousKeyType = type
})

function calculate (firstNumber, operator, secondNumber) {
	firstNumber = parseInt(firstNumber)
	secondNumber = parseInt(secondNumber)
	if(operator === 'plus') return firstNumber + secondNumber
	if(operator === 'minus') return  firstNumber - secondNumber
	if(operator === 'times') return firstNumber * secondNumber
	if(operator === 'divide') return firstNumber / secondNumber
}

function clearCalculator() {
	// press the clear key
	const clearKey = document.querySelector('[data-type="clear"]')
	clearKey.click()
}

function testClearKey() {
	clearCalculator()
}

// ===========
// TESTING
// ===========

// console.assert(assertion, msg)

const one = document.querySelector('.one')
one.click()
console.assert(display.textContent === '1', 'Clicked One')
clearCalculator()
// one. addEventListener('click', event => {
// 	console.log('hello')
// })
