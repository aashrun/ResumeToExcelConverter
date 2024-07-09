const pdfParse = require('pdf-parse');
const fs = require("fs")
const aiFunc = require("../AI-Helpers/aiFunc")
let convertToExcel = require("../ExcelConvert/excelConvert")

const pdfParseFunc = async (req, res) => {
    try {
        const files = req.files
        let arr = []

        for (let file of files) {
            const dataBuffer = fs.readFileSync(file.path); 
            const data = await pdfParse(dataBuffer);
            
            let jsonString = await aiFunc.gpt(`${[data.text]}, I need name, mobile, email, location, yearsOfExperience, position, age, linkedInProfile enclosed in an object. Find these details in the above given array's 0th index and STRICTLY reply with a JSON object ONLY.`)
            let jsonData = jsonString.replace(/^```json\s+/g, '').replace(/\s+```$/g, '');
            arr.push(JSON.parse(jsonData))
            

        }

        convertToExcel.convertToExcel(arr)        
        return res.status(200).json({ message: arr });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { pdfParseFunc };
