const fs = require('fs'); 
const parse = require('csv-parse');

const convert = require('./convertCSV.js')
const writeStream = require('./writeStream.js')
const getSalaryInfo = require('./csvModules/salary.js')
// const salaryConfig = require('./csvModules/salaryConfig.js')

// salaryConfig handling has been moved into salary to reduce file jumps and increase readability

module.exports = parseCSV

// function parserCallback(err, entries){
// 	getSalaryInfo(err, entries)
// 	writeStream("./testEmployeesCSV.csv")
// }

function parseCSV(path){
	var parser = parse({
		columns: false,
	}, function(err, entries){
		if(err){ throw err}
		let csvArray = getSalaryInfo(entries)
		let outputDir = path.split(".csv")[0] + "-output.csv"
		convert.arrToString(csvArray, outputDir, writeStream)
	});

	fs.createReadStream(path).pipe(parser);
}

