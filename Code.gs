
const URL = "https://docs.google.com/spreadsheets/d/1ZSX-3UuxJnq0ti0HF-J5Mvyh5BtJ3OyeSt2dDP-EI3o/edit?resourcekey#gid=142789237";


function myFunction() {
  /**
   * Converts the given form URL into a JSON object.
   */
  var spreadsheet = SpreadsheetApp.openByUrl(URL);
  var sheet1 = spreadsheet.getSheets()[0];
  var sheet2 = spreadsheet.getSheets()[1];
  
  var untagged_dataRange = sheet1.getDataRange();
  var untagged_data = untagged_dataRange.getValues();
  var requiredColumns = initializeRequiredColumns(untagged_data);

  var tagged_dataRange = sheet2.getDataRange();
  var tagged_data = tagged_dataRange.getValues();
  
  var zipIndex = untagged_data[0].indexOf("Zip Code");
  var sdgIndex = untagged_data[0].indexOf("SDG");
  var capitalIndex = untagged_data[0].indexOf("Community Capital");

  var validData = [];
  var moveData = [];
  var invalidData = [];

  for(r=1; r<untagged_data.length; r++){
    row = untagged_data[r];
    if(checkRow(untagged_data[r], zipIndex, requiredColumns) === ""){ 
      validData.push(row);
      if (row[sdgIndex] !== "" && row[capitalIndex] !== "") 
        moveData.push(row);
        sheet1.deleteRow(r);
    }
    else{
      invalidData.push(row);
    }

  }

  //read headers store in header array
  var untagged_headers = untagged_data[0];
  var tagged_headers = tagged_data[0];
  
  if (untagged_headers.every((val, index) => val == tagged_headers[index])){
    sheet2.appendRow(moveData);
  }
  else {
    sheet2.insertRowsBefore(1, moveData.length + 2);
    sheet2.getRange(1,1, 1, untagged_headers.length()).setValues(untagged_headers);
    sheet2.getRange(2, 2 + moveData.length, 1, untagged_headers.length()).setValues(moveData);
  }   

  var jsonOutput = converter(untagged_headers, validData);
  Logger.log("All responses are converted to JSON: \n" + jsonOutput);

  var options = {
    method: "POST",
    muteHttpExceptions: true, 
    headers: {
      "Authorization": "Token " + api_token
    },
    payload: {org: null, data: jsonOutput}
  }
  var response = UrlFetchApp.fetch('https://vibrancy.newsunrising.org/api/community-context-surveys/', options);
  Logger.log("Sent with response: " + response);

}
