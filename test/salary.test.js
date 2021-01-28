const getSalary = require('../csvModules/salary');

	/*
	First Name,Last Name,Annual Salary,Super Rate (%),Payment Start Date
	Andrew,Smith,60050,9%,01 March – 31 March
	Claire,Wong,120000,10%,01 March – 31 March
	*/

test('Test single CSV Array with correct input', () => {

	let entries = [
		["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"],
		["Andrew","Smith","60050","9%","01 March – 31 March"]
	]

	let result = getSalary(entries)
	let expectation = [
		[ 'Andrew Smith', '01 March – 31 March', 5004, 922, 4082, 450 ],
	]

	expect(result).toStrictEqual(expectation);
});

// test decimals/floats
// test incorrect types
// test incorrect expected data 9% -> 9 % || 9/100

test('Test single CSV Array with different headers', () => {

	let entries = [
		["Not name","who Name","My Salary","Rate (%)","Payment Date"],
		["Andrew","Smith","60050","9%","01 March – 31 March"]
	]

	/*
		First Name,Last Name,Annual Salary,Super Rate (%),Payment Start Date
		Andrew,Smith,60050,9%,01 March – 31 March
		Claire,Wong,120000,10%,01 March – 31 March
	*/

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

	let entries = [
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
