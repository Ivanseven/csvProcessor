const stringify = require('csv-stringify')
// const generate = require('csv-generate')
const assert = require('assert')

exports.arrToString = arrToString

function arrToString(arr, outputDir, callback){
	stringify(arr,(err, output)=>{
		if(err){throw err}
		// assert.equal(output, '1,2,3,4\na,b,c,d\n')
		return callback(output, outputDir)
	})
}

