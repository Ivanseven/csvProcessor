console.log("Hello! Good Day!")

// input:
let testInput = `First Name,Last Name,Annual Salary,Super Rate (%),Payment Start Date
Andrew,Smith,60050,9%,01 March – 31 March
Claire,Wong,120000,10%,01 March – 31 March`

let employeesJson = [
	["Andrew", "Smith", "60050", "9%", "01 March – 31 March"],
	["Claire", "Wong", "120000", "10%","01 March – 31 March"]
]

function prepareCSV(csvString){
	csvString.split(",")
	console.log(csvString)
}

function getSalaryRates(employeesArray){

}

prepareCSV(testInput)