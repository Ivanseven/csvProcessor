// Salary Config
/// Values are in $

/* Ref:
	fixed is the fixed amount of tax to add on each group
	45cents for each $1 over this 18201
	rate is the 0.45 for 45 cents
	overAmount is 18201

	Example:
	$45001-$120000 -> $6750 plus 32.5 cents for each $1 over $45000
	const sample1 = "45001-120000":{"fixed":6750, "rate": 0.325, "overAmount": 45000}

	Note: Fixed percentage on income can be done like this
	0-$45000 -> 15%
	15 cents for each dollar over 0
	const sample2 = "0-45000":{"fixed":0, "rate": 0.15, "overAmount": 0}

	For free tax, fixed and rate should be 0

	Using overAmount allows more freedom and only requires one nested object to be open
*/
let salaryConfig = {limits:{
	"0-18200":{"fixed":0, "rate": 0, "overAmount": 0},
	"18201-37000":{"fixed":0, "rate": 0.19, "overAmount": 45000},
	"37001-87000":{"fixed":3572, "rate": 0.325, "overAmount": 37000},
	"87001-180000":{"fixed":19822, "rate": 0.37, "overAmount": 87000},
	// Assume last/highest is 180000 and over? OR use Infinity?
	"180001-Infinity":{"fixed":54232, "rate": 0.45, "overAmount": 180000} 
}, startRow:1}
// Start row means it will start at the row indicated; 
// This is to skip title rows; Default is 1

module.exports = salaryConfig

