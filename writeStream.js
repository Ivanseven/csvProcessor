const fs = require('fs')
const salaryCSV = require('./parseCSV.js')

module.exports = writeStream


function writeStream (csvString, outputPath){
	var outputPath = outputPath || './output.csv'
	// This opens up the writeable stream to `output`
	const writeStream = fs.createWriteStream(outputPath);

	const { Readable } = require('stream'); 

	const inStream = new Readable({
	  read() {}
	});

	// inStream.push('ABCDEFGHIJKLM');
	// inStream.push('NOPQRSTUVWXYZ');
	inStream.push(csvString)
	inStream.push(null); // No more data

	// inStream.pipe(process.stdout);
	inStream.pipe(writeStream)
	console.log(`Your file was written to:\n ${outputPath}`)
}








// Stream version
function oldStream(inputPath, outputPath){

	var outputPath = outputPath || './output'
	// This opens up the writeable stream to `output`
	var writeStream = fs.createWriteStream(outputPath);
	var readStream = fs.createReadStream(inputPath);

	readStream.on('open', function () {
		// This just pipes the read stream to the response object (which goes to the client)
		readStream.pipe(writeStream);
	});

	// After all the data is saved, respond with a simple html form so they can post more data
	readStream.on('end', function () {
		console.log("We have finished processing your CSV")
		console.log(`Your output is saved at: ${true}`)
	});

	// This is here incase any errors occur
	writeStream.on('error', function (err) {
		console.log(err);
	});

	readStream.on('error', function (err) {
		console.log("Failed to read file")
		console.log(err);
	});
}

// writeStream("./dsa.csv")

// writeStream("./testEmployeesCSV.csv")