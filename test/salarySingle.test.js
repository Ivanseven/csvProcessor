const getSalary = require('../csvModules/salary');

	/*
	First Name,Last Name,Annual Salary,Super Rate (%),Payment Start Date
	Andrew,Smith,60050,9%,01 March – 31 March
	Claire,Wong,120000,10%,01 March – 31 March
	*/

	const sampleEntries = [
		["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"],
		["Andrew","Smith","60050","9%","01 March – 31 March"]
	]

	const result = getSalary(sampleEntries)
	const fullName = result[0][0]
	const paymentDate = result[0][1]
	const grossIncome = result[0][2]
	const incomeTax = result[0][3]
	const netIncome = result[0][4]
	const superAmount = result[0][5]


test('Test single CSV Array for netIncome > incomeTax', () => {
	expect(netIncome > incomeTax).toStrictEqual(true);
});

test('Test single CSV Array for netIncome > superAmount', () => {
	expect(netIncome > superAmount).toStrictEqual(true);
});

test('Test single CSV Array for netIncome > grossIncome', () => {
	expect(netIncome <= grossIncome).toStrictEqual(true);
});

test('Test single CSV Array, grossIncome, incomeTax, netIncome, superAmount for integer values', () => {

	let integers = false

	if(Number.isInteger(grossIncome) && Number.isInteger(incomeTax) && Number.isInteger(netIncome) && Number.isInteger(superAmount)){
		integers = true
	}

	expect(integers).toStrictEqual(true);
});

test('Test single CSV Array for string values', () => {

	let strings = false

	function isString(x) {
		return Object.prototype.toString.call(x) === "[object String]"
	}

	if(isString(fullName) && isString(paymentDate) ){
		strings = true
	}

	expect(strings).toStrictEqual(true);
});

test('Test single CSV Array with correct input', () => {

	// const sampleEntries = [
	// 	["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"],
	// 	["Andrew","Smith","60050","9%","01 March – 31 March"]
	// ]

	let result = getSalary(sampleEntries)
	let expectation = [
		[ 'Andrew Smith', '01 March – 31 March', 5004, 922, 4082, 450 ],
	]

	expect(result).toStrictEqual(expectation);
});

test('Test single CSV Array with different headers', () => {

	let entries = [
		["Not name","who Name","My Salary","Rate (%)","Payment Date"],
		["Andrew","Smith","60050","9%","01 March – 31 March"]
	]

	let result = getSalary(entries)
	let expectation = [
		[ 'Andrew Smith', '01 March – 31 March', 5004, 922, 4082, 450 ],
	]

	expect(result).toStrictEqual(expectation);
});

test('Test single CSV Array with Annual Salary in type Integer', () => {

	let entries = [
		["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"],
		["Andrew","Smith", 60050 ,"9%","01 March – 31 March"]
	]

	let result = getSalary(entries)
	let expectation = [
		[ 'Andrew Smith', '01 March – 31 March', 5004, 922, 4082, 450 ],
	]

	expect(result).toStrictEqual(expectation);
});

test('Test single CSV Array with spacings in values', () => {

	var entries = [
		["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"],
		["And rew","Smi th", "  60050  ","9   %","01 March – 31 March"]
	]

	let result = getSalary(entries)
	let expectation = [
		[ 'And rew Smi th', '01 March – 31 March', 5004, 922, 4082, 450 ],
	]

	expect(result).toStrictEqual(expectation);
});

test('Test single CSV Array with float/decimal Super Rate, 9.0%', () => {

	let entries = [
		["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"],
		["Andrew","Smith", "60050","9.0%","01 March – 31 March"]
	]

	let result = getSalary(entries)
	let expectation = [
		[ 'Andrew Smith', '01 March – 31 March', 5004, 922, 4082, 450 ],
	]

	expect(result).toStrictEqual(expectation);
});

test('Test single CSV Array with salary of lowest taxBracket', () => {

	var entries = [
		["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"],
		["Andrew","Smith", "18201","9.0%","01 March – 31 March"]
	]

	let result = getSalary(entries)
	let expectation = [
		[ 'Andrew Smith', '01 March – 31 March', 1517, 0, 1517, 137 ],
	]

	expect(result).toStrictEqual(expectation);
});

test('Test single CSV Array with net worth of the richest man, $113 billion||113,000,000,000', () => {

	var entries = [
		["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"],
		["Andrew","Smith", "113000000000","9.0%","01 March – 31 March"]
	]

	let result = getSalary(entries)
	let expectation = [
		[ 'Andrew Smith', '01 March – 31 March', 9416666667, 4237497769, 5179168898, 847500000 ],
	]

	expect(result).toStrictEqual(expectation);
});

test('Test single CSV Array with salary of 14', () => {

	let entries = [
		["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"],
		["Andrew","Smith", "1","9.0%","01 March – 31 March"]
	]

	let result = getSalary(entries)
	let expectation = [
		[ 'Andrew Smith', '01 March – 31 March', 0, 0, 0, 0 ],
	]

	expect(result).toStrictEqual(expectation);
});

test('Test single CSV Array with salary of 6', () => {

	let entries = [
		["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"],
		["Andrew","Smith", "1","9.0%","01 March – 31 March"]
	]

	let result = getSalary(entries)
	let expectation = [
		[ 'Andrew Smith', '01 March – 31 March', 0, 0, 0, 0 ],
	]

	expect(result).toStrictEqual(expectation);
});

test('Test single CSV Array with salary of 1', () => {

	let entries = [
		["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"],
		["Andrew","Smith", "1","9.0%","01 March – 31 March"]
	]

	let result = getSalary(entries)
	let expectation = [
		[ 'Andrew Smith', '01 March – 31 March', 0, 0, 0, 0 ],
	]

	expect(result).toStrictEqual(expectation);
});

test('Test single CSV Array with salary of 0.5', () => {

	let entries = [
		["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"],
		["Andrew","Smith", "0.5","9.0%","01 March – 31 March"]
	]

	let result = getSalary(entries)
	let expectation = [
		[ 'Andrew Smith', '01 March – 31 March', 0, 0, 0, 0 ],
	]

	expect(result).toStrictEqual(expectation);
});

test('Test single CSV Array with salary of 0', () => {

	let entries = [
		["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"],
		["Andrew","Smith", "0","9.0%","01 March – 31 March"]
	]

	let result = getSalary(entries)
	let expectation = [
		[ 'Andrew Smith', '01 March – 31 March', 0, 0, 0, 0 ],
	]

	expect(result).toStrictEqual(expectation);
});

test('Test single CSV Array with superRate of 0', () => {

	let entries = [
		["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"],
		["Andrew","Smith", "60050","0%","01 March – 31 March"]
	]

	let result = getSalary(entries)
	let expectation = [
		[ 'Andrew Smith', '01 March – 31 March', 5004, 922, 4082, 0 ],
	]

	expect(result).toStrictEqual(expectation);
});

test('Test single CSV Array with superRate of 0.3', () => {

	let entries = [
		["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"],
		["Andrew","Smith", "60050","0.3%","01 March – 31 March"]
	]

	let result = getSalary(entries)
	let expectation = [
		[ 'Andrew Smith', '01 March – 31 March', 5004, 922, 4082, 15 ],
	]

	expect(result).toStrictEqual(expectation);
});

test('Test single CSV Array with superRate of 0.07', () => {

	let entries = [
		["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"],
		["Andrew","Smith", "60050","0.07%","01 March – 31 March"]
	]

	let result = getSalary(entries)
	let expectation = [
		[ 'Andrew Smith', '01 March – 31 March', 5004, 922, 4082, 4 ],
	]

	expect(result).toStrictEqual(expectation);
});

test('Test single CSV Array with superRate of 0.004', () => {

	let entries = [
		["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"],
		["Andrew","Smith", "60050","0.004%","01 March – 31 March"]
	]

	let result = getSalary(entries)
	let expectation = [
		[ 'Andrew Smith', '01 March – 31 March', 5004, 922, 4082, 0 ],
	]

	expect(result).toStrictEqual(expectation);
});


// Test ideas:
	// assert integer values
	// test decimals/floats
	// test incorrect types
	// test incorrect expected data 9% -> 9 % || 9/100 || 9.0

// Bad Test
	// test('Test single CSV Array with spacings in between Annual Salary, 60 500', () => {

	// 	let entries = [
	// 		["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"],
	// 		["Andrew","Smith", "60 050","9%","01 March – 31 March"]
	// 	]

	// 	let result = getSalary(entries)
	// 	let expectation = [
	// 		[ 'And rew Smi th', '01 March – 31 March', 5004, 922, 4082, 450 ],
	// 	]

	// 	expect(result).toStrictEqual(expectation);
	// });
