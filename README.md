# CSV Processor

A NodeJS app that reads and writes CSVs using the [node-csv module](https://github.com/adaltas/node-csv). 

Currently it only reads from the given `salary.js` module with `salaryConfig.js` to store tax configurations, which is sourced from [Australian tax rates](https://www.ato.gov.au/Rates/Individual-income-tax-rates/)

Ultimately its intention is to be for open-ended usage by using different modules, as stored in the `csvModules` folder

## Getting Started
### Requirements:

You will need [Node.js](https://nodejs.org/en/download/) installed to run this application.

### Install

	git clone https://github.com/Ivanseven/csvProcessor.git
	cd csvProcessor
	npm install


### Usage (After module and config setup, `salary.js` is setup by default)
After installation, in the csvProcessor directory:

	node fileNav
	// OR
	npm start

Currently running npm start does not exit properly yet however.

You should see the following:

	Welcome To Salary Calculator!
	You are currently using: salary.js to process your CSV files
	┌─────────┬───────────────────────────────┐
	│ (index) │            Values             │
	├─────────┼───────────────────────────────┤
	│    0    │ 'testEmployeesCSV-output.csv' │
	│    1    │    'testEmployeesCSV.csv'     │
	└─────────┴───────────────────────────────┘
	Please select a CSV to read:
	(Use the index number OR filename)
	Index/File:

Either write the entire file name or the index number given (ie: 1)

The following message should appear, showing you where the output was saved:
	
	Your file was written to:
 	C:\Code\Projects\Nodejs\salary-calculator/testEmployeesCSV-output.csv


## How to setup Modules (Not ready yet)

### Module Config
	- TO DO
	- Will use fileConfig.js later on


### How To use Salary Module (`salary.js`)

#### Changing the salary configurations:

Using the Resident Tax Rates Table from https://www.ato.gov.au/Rates/Individual-income-tax-rates/#Residents

Resident tax rates 2020–21
	
| Taxable income      | Tax on this income                                   |
| ------------------- | :--------------------------------------------------: |
| 0 – $18,200         | Nil                                                  |
| $18,201 – $45,000   | 19 cents for each $1 over $18,200                    |
| $45,001 – $120,000  | $5,092 plus 32.5 cents for each $1 over $45,000      |
| $120,001 – $180,000 | $29,467 plus 37 cents for each $1 over $120,000      |
| $180,001 and over   | $51,667 plus 45 cents for each $1 over $180,000      |

We can write the config like so:

	// csvModules\salaryConfig.js

	const salaryConfig = {limits:{
		"0-18200":{"fixed":0, "rate": 0, "overAmount": 0},
		"18201-45000":{"fixed":0, "rate": 0.19, "overAmount": 18200},
		"45001-120000":{"fixed":5092, "rate": 0.325, "overAmount": 45000},
		"120001-180000":{"fixed":29467, "rate": 0.37, "overAmount": 120000},
		"180001-Infinity":{"fixed":51667, "rate": 0.45, "overAmount": 180000} 
	}, startRow:1}

The way the tax calculation works is like this:
	
	var income = 50000
	var taxableIncome = income - overAmount
	var tax = taxableIncome * rate
	tax = tax + fixed

For a condition that uses percentage, like so:

| Taxable income      | Tax on this income |
| ------------------- | :----------------: |
| 0 – $18,200         | 15%                |

You can achieve the same result with:

	"0-18200":{"fixed":0, "rate": 0.15, "overAmount": 0}

#### Salary Module Sample Input (Not required for normal usage)

	// csvModules\salary.js

	let entries = [
		["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"], // Order of elements is important, naming can be ignored 
		["Bob", "the Builder", "80000", "9%", "01 June – 31 June"]
	]
	getSalaryInfo(entries)
		
	

#### Project Log Info
Created on 8+ GMT 1:30pm, 25 Jan, 2021
devEnv: Node v12.13.0
