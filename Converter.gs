function converter(URL) {
  var sheet = SpreadsheetApp.openByUrl(URL);
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();
  
  var headers = data[0];
  var output = [];

  //change header names
  var new_headers = ["Timestamp", "City", "State", "Zip", "GeoIssue", "Org", "Assets", "AssetFile", "Barriers", "BarriersFile", "Hopes", "HopesFile", "Fears", "FearsFile", "Expectations", "ExpectationsFile", "Tag"]
  
  for (var i = 1; i < data.length; i++) {
    var row = {};
    for (var j = 0; j < headers.length; j++) {
      row[new_headers[j]] = data[i][j];
    }
    output.push(row);
  }
  
  var jsonString = JSON.stringify(output);

  // output a json file that contains the string
  // const file_name = "output_file.json";
  // var folder = DriveApp.getFolderById('1Ljq_BE7dpQ8aVcF2O9gX7r2VtFBvIdfp');
  // deleteFile(file_name, folder);
  // var file = folder.createFile(file_name, jsonString, "application/json");
  return jsonString;
}

// function deleteFile(file_name, folder) {
//   var files = folder.getFilesByName(file_name);
  
//   while (files.hasNext()) {
//     var file = files.next();
//     folder.removeFile(file);
//     Logger.log("File deleted: " + file_name);
//   }
// }
