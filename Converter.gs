function converter(URL) {
  var sheet = SpreadsheetApp.openByUrl(URL);
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();
  
  var headers = data[0];
  var output = [];
  
  for (var i = 1; i < data.length; i++) {
    var row = {};
    for (var j = 0; j < headers.length; j++) {
      row[headers[j]] = data[i][j];
    }
    output.push(row);
  }
  
  var jsonString = JSON.stringify(output);
  var folder = DriveApp.getFolderById('1Ljq_BE7dpQ8aVcF2O9gX7r2VtFBvIdfp');
  var file = folder.createFile("output_file.json", jsonString, "application/json");
  return file.getId();
}
