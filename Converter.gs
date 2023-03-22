function converter(URL) {
  var sheet = SpreadsheetApp.openByUrl(URL);
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();
  
  var headers = data[0];
  var output = [];

  //change header names and push to output
  var new_headers = ["Timestamp", "City", "State", "Zip", "GeoIssue", "Org", "Assets", "AssetFile", "Barriers", "BarriersFile", "Hopes", "HopesFile", "Fears", "FearsFile", "Expectations", "ExpectationsFile", "Tag"]
  output.push(new_headers);
  
  for (var i = 2; i < data.length; i++) {
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
