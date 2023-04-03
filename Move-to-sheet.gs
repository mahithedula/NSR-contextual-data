function moveData(URL) {
  // define the spreadsheet and the sheets
  var spreadsheet = SpreadsheetApp.openByUrl(URL);
  var sheet1 = spreadsheet.getSheets()[0];
  var sheet2 = spreadsheet.getSheets()[1];

  var dataRange = sheet1.getRange(2,1,sheet1.getLastRow(), sheet1.getLastColumn());
  var data = dataRange.getValues();

  // SDG and capital column index
  var firstRow = sheet1.getRange(1, 1, 1, sheet1.getLastColumn()).getValues()[0];
  var sdgIndex = firstRow.indexOf("SDG");
  var capitalIndex = firstRow.indexOf("Community Capital");

  data.forEach(function(row, index) {
    if (row[sdgIndex] !== "" && row[capitalIndex] !== "") {
      // Copy the filtered row to Sheet2
      var destinationRange = sheet2.getRange(sheet2.getLastRow() + 1, 1, 1, row.length);
      destinationRange.setValues([row]);
      
      // Clear the contents of the filtered row in Sheet1
      var startingRow = dataRange.getRow() + index;
      sheet1.deleteRow(startingRow);
    }
  });

}
