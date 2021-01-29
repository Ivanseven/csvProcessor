# CSV Processor

A NodeJS app that reads and writes CSVs using the [node-csv module](https://github.com/adaltas/node-csv). 

Currently it only reads from the given `salary.js` module with `salaryConfig.js` to store tax configurations, which is sourced from https://www.ato.gov.au/Rates/Individual-income-tax-rates/

Ultimately its intention is to be for open-ended usage by using different modules, as stored in the `csvModules` folder

## Getting Started
### Requirements:

You will need [Node.js](https://nodejs.org/en/download/) installed to run this application.

### Install

	git clone https://github.com/Ivanseven/csvProcessor.git
	cd csvProcessor
	npm install


### Usage
##### (After module and config setup; `salary.js` is setup by default)

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

A message similar to the following should appear, showing you where the output was saved:
	
	Your file was written to:
 	C:\whereYouGitCloned\csvProcessor\testEmployeesCSV-output.csv
	

## Setup Modules (To Do)

#### Module Config
	- TO DO
	- Will use fileConfig.js later on

## Changing the Salary Configuration (salaryConfig.js):

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

###### Take note that final calculations are rounded to integers.

#### The way the tax calculation works is similar to this:
	
	var income = 50000; var taxableIncome;
	if(income >= overAmount){
		taxableIncome = income - overAmount
	} else {
		taxableIncome = 0
	}
	var tax = taxableIncome * rate
	tax = tax + fixed


#### For a condition that uses percentage, like so:

| Taxable income      | Tax on this income |
| ------------------- | :----------------: |
| 0 – $18,200         | 15%                |

You can achieve the same result with:

	"0-18200":{"fixed":0, "rate": 0.15, "overAmount": 0}


## Using Salary Module (salary.js)

#### (Not required when using csvProcessor)

	// csvModules\salary.js

	let entries = [
		// Order of elements is important, naming can be ignored for skipped Arrays
		// First array is skipped by default; Can be changed in salaryConfig
		["First Name","Last Name","Annual Salary","Super Rate (%)","Payment Start Date"],
		["Bob", "the Builder", "80000", "9%", "01 June – 31 June"]
	]
	getSalaryInfo(entries)
		
###### Take note that final calculations are rounded to integers.

### Project Log Info
------
Project started at GMT/UTC +8 1:30pm, 25 Jan, 2021

devEnv: Node v12.13.0
