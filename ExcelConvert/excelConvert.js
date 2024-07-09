const XLSX = require('xlsx');
const moment = require('moment');


const convertToExcel = (data) => {
  try {
    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(data);
    let date = getFormattedDate()
    let filePath = date + '.xlsx';

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, filePath);
    return

  } catch (error) {

    console.log("convertToExcel Function Error: " + error.message)
    return error.message
  }

}




const getFormattedDate = () => {
  return moment().format('DD-MM-YYYY');
}



module.exports = { convertToExcel }
