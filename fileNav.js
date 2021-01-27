const fs = require("fs")
const readline = require('readline');
const path = require('path')

const parseCSV = require('./parseCSV.js')


// placeholder
var moduleName = "salary.js"

// Strictly matching filename by observing upper/lower case
// No auto completion for file names yet
function getInput(fileArr){
	let userSelection = ""

	const rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});

	return new Promise((resolve, reject)=>{
		rl.question( "Index/File:", (answer) => {
		  // console.log(`Received: '${answer}'`)
		  
		  // Number(answer) = 0; Can use as default answer?
		  // Verify answer is an integer & in fileArr range
		  if(Number.isInteger(parseInt(answer)) && parseInt(answer) <= fileArr.length-1 && parseInt(answer) >= 0){
		  	userSelection = answer
		  } else if(fileArr.includes(answer)){ // matches file name
		  	userSelection = answer
		  } else {
		  	console.log("We could not find your file. Please try again.")
		  }
		  rl.close();
		});

		rl.on('close', ()=>{
		  	return resolve(userSelection)
		})
	})
}

function readCSV(input){
		let csvName

		if(input !== ""){ // 0 == "" = true
			if((parseInt(input) >= 0)){ // Input is a number
				csvName = csvFiles[input]
			} else {  // Input is a String
				csvName = csvFiles[csvFiles.indexOf(input)]
			}
			// Current Working Dir + filename
			parseCSV(process.cwd() + "/"+csvName)
		}
}

console.log("Welcome To Salary Calculator!")
console.log(`You are currently using: ${moduleName} to process your CSV files`)

// withFileTypes lists dir/symlinks; We only need .csv
fs.readdir("./",{"withFileTypes": false}, async function(err, files){
	if(err){
		 throw err;
	}

	csvFiles = []
	for (var i = 0; i != files.length ; i++) {
		let ext = path.extname(files[i])
		if (ext == ".csv") {
			csvFiles.push(files[i])
		}
	}

	if(csvFiles.length < 1){
		console.log("No CSV files found in your current directory")
	} else {
		console.table(csvFiles)
		console.log("Please select a CSV to read:")
		console.log("(Use the index number OR filename)")

		let input = await getInput(csvFiles)
		readCSV(input)
	}
})




// console.log( __dirname) // This folder
// console.log(process.cwd()) // where the current files are




