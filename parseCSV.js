const fs = require('fs'); 
const parse = require('csv-parse');
const getSalaryInfo = require('./csvModules/salary.js')
// const salaryConfig = require('./csvModules/salaryConfig.js')

module.exports = parseCSV

// function parserCallback(err, entries){
// 	let limits = salaryConfig.limits
// 	let startRow = salaryConfig.startRow
// 	console.log(limits, startRow)
// 	getSalaryInfo(err, entries, limits, startRow)
// }

function parseCSV(path){
	var parser = parse({
		columns: false,
	}, getSalaryInfo);//parserCallback);
	fs.createReadStream(path).pipe(parser);
}

