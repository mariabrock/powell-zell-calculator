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

	// is this a number key?
	if(type === 'number') {
		if(displayValue === '0') {
			display.textContent = keyValue
		} else if (previousKeyType === 'operator') {
			display.textContent = keyValue
		} else {
			display.textContent = displayValue + keyValue
		}

		// to reset the value
		calculator.dataset.previousKeyType = 'number'
	}

	// is this an operator key?
	if(type === 'operator') {
		console.log(key)

		calculator.dataset.previousKeyType = 'operator'
	}
})
