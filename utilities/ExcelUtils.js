const ExcelJS = require('exceljs');


async function readExcelData() {

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile("C:/AutomationProjects/Playwright_JS/ExcelTestData.xlsx");
    const worksheet = workbook.getWorksheet("Sheet1");
    //Initialize Variables for Headers and Data
    let headers = [];
    let data = [];

    /* worksheet.getRow(1) → Selects the first row (which usually contains column headers).
    eachCell((cell) => {...}) → Loops through each cell in this row.
    cell.value → Gets the value of the cell (e.g., "Username").
    headers.push(cell.value); → Adds the header names to the headers array.
    eg:headers = ["Test Case", "Username", "Password", "Role", "Status"];*/

    //Read the first row as column headers
    worksheet.getRow(1).eachCell((cell) => {
        headers.push(cell.value);  
    });

    // Read the remaining rows as test data
    //row holds entire rowdata and rownumber holds number of that row
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) { // Skip the header row
            let rowData = {};
            row.eachCell((cell, colNumber) => {
                rowData[headers[colNumber - 1]] = cell.value;  // Map header to value
            });
            data.push(rowData);
        }
    });

    return data;  // Returns an array of objects
}

module.exports = { readExcelData };