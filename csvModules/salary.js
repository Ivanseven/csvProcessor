module.exports = getSalaryInfo


function getSalaryInfo(entries){
	const salaryConfig = require('./salaryConfig.js')
	const limits = salaryConfig.limits
	var startRow = salaryConfig.startRow
		
	function getIncomeTax(income){
		// We round up/down to prevent decimals
		income = Math.round(income)
		let tax = 0; let taxableIncome;

		function matchTaxBracket(){
			let taxBrackets = Object.keys(limits)

			for (var i = 0; i != taxBrackets.length; i++) {
				let lowerLimit = taxBrackets[i].split("-")[0]
				let upperLimit = taxBrackets[i].split("-")[1]

				if(income >= lowerLimit && income <= upperLimit){
					taxableIncome = income - limits[taxBrackets[i]].overAmount
					if(taxableIncome <= 0){
						taxableIncome = 0
					}
					tax =  (taxableIncome * limits[taxBrackets[i]].rate) + limits[taxBrackets[i]].fixed

					return tax
				}// else {
				// 	console.log("Failed to calculate incomeTax")
				// }
			}
		}

		tax = matchTaxBracket(income)

		// We round up/down for the final value
		tax = Math.round(tax/12)
		return tax
	}

	let csvArray = []
	// var startRow = 1 to skip first columns like titles
	var startRow = startRow || 1
	
	for (var i = startRow; i < entries.length; i++) {
		/* Reference:
			entry[0] = first-name
			entry[1] = last-name
			entry[2] = annual-salary
			entry[3] = super-rate (%)
			entry[4] = payment-start-date
		*/

		// We round the numbers at the final calculation & for incomeTax
		// Math.round fits the requirements
		// Math.round(0.49) = 0

		let entry = entries[i]
		let name = entry[0] + " " + entry[1]
		let payPeriod = entry[4]
		let grossIncome = Math.round(entry[2]/12)
		let incomeTax = getIncomeTax(entry[2])
		let netIncome = Math.round(grossIncome - incomeTax)
		// - convert 9% to 0.090
		let superRate = (entry[3].split("%")[0]/100) // .toPrecision(2) ignoring floating point ie 0.9/100 = 0.09000001
		let superAmount = Math.round(grossIncome * superRate)

		let employeeArr = [name, payPeriod, grossIncome, incomeTax, netIncome, superAmount]
		csvArray.push(employeeArr)
	}
	// console.log("Your CSV Array:", csvArray)

	return csvArray
}

