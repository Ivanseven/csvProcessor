const fs = require('fs')
const salaryCSV = require('./parse.js')

// Stream version
function openStream(inputPath, outputPath){

var outputPath = outputPath || './output'
var writeStream = fs.createWriteStream(outputPath);
var readStream = fs.createReadStream(inputPath);
	// This opens up the writeable stream to `output`
	var writeStream = fs.createWriteStream('./output');

	readStream.on('open', function () {
	// This just pipes the read stream to the response object (which goes to the client)
	readStream.pipe(writeStream);
	});

	// After all the data is saved, respond with a simple html form so they can post more data
	readStream.on('end', function () {
	// res.writeHead(200, {"content-type":"text/html"});
	// res.end('<form method="POST"><input name="test" /><input type="submit"></form>');
	});

	// This is here incase any errors occur
	writeStream.on('error', function (err) {
	console.log(err);
	});
	readStream.on('error', function (err) {
	console.log(err);
	console.log("He!")
	});
}

// openStream("./dsa.csv")

openStream("./testEmployeesCSV.csv")