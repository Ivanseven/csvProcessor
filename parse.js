const fs = require('fs'); 
const parse = require('csv-parse');


var parser = parse({
	columns: false,
}, function (err, entries) {
	console.log(err);
	// console.log(entries)
	// Currently hard coding tax bracket values
	function getIncomeTax(income, limits){
		// We round up/down to prevent decimals
		income = Math.round(income)
		let tax = 0; let taxableIncome;
		if (income <= 18200) {
			// No taxation
		} else if(income >= 18201 && income <= 37000){
			taxableIncome = income - 18200
			tax = taxableIncome * 0.19
		} else if(income >= 37001 && income <= 87000){
			taxableIncome = income - 37000
			tax = (taxableIncome * 0.325) + 3572
		} else if(income >= 87001 && income <= 180000){
			taxableIncome = income - 87000
			tax = (taxableIncome * 0.37) + 19822
		} else if(income >= 180001){
			taxableIncome = income - 180000
			tax = (taxableIncome * 0.45) + 54232
		} else {
			console.log("Failed to calculate incomeTax")
		}

		// We round up/down for the final value
		tax = Math.round(tax/12)
		return tax
	}

	let csvArray = []
	// var i = 1 to skip title columns
	for (var i = 1; i < entries.length; i++) {
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
	console.log(csvArray)
	return csvArray
});

fs.createReadStream(__dirname+"/testEmployeesCSV.csv").pipe(parser);


