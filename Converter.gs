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
    row["id"] = Utilities.getUuid();
    for (var j = 0; j < headers.length; j++) {
      row[new_headers[j]] = data[i][j];
    }
    output.push(row);
  }

  var jsonString = JSON.stringify(output);
  return jsonString;
}
