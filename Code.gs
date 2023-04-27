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
      if (row[sdgIndex] !== "" && row[capitalIndex] !== ""){
        moveData.push(row);
        sheet1.deleteRow(r+1);
      }
    }
    else{
      invalidData.push(r);
    }

  }

  //iterate through the invalidData and set background yellow
  for(var i=0; i<invalidData.length; i++){
    sheet1.getRange(r, 1, 1, sheet1.getLastColumn()).setBackground("yellow");
  }


  //if validData is empty we don't need to do anything
  if (validData == "null" || validData.length == 0){
    Logger.log("No data, executing without API response")
    return;
  }

  //read headers store in header array
  var untagged_headers = sheet1.getRange(1,1,1,sheet1.getLastColumn()).getValues();
  var tagged_headers = sheet2.getRange(1,1,1,sheet1.getLastColumn()).getValues();
  if (moveData.length>0 && untagged_headers.length == tagged_headers.length){
    //find the first empty row
    var row_num = 0;
    for(var i=0; i<sheet2.getMaxRows(); i++){
      if(sheet2.getRange(i+1, 1, 1, untagged_data[0].length).isBlank()){
        row_num = i;
        break;
      }
    }
    sheet2.insertRowsAfter(row_num, moveData.length);
    sheet2.getRange(row_num+1, 1, moveData.length, untagged_data[0].length).setValues(moveData);
  }
  else if(moveData.length > 0) {
    sheet2.insertRowsBefore(1, moveData.length + 2);
    sheet2.getRange(1,1, 1, untagged_data[0].length).setValues(untagged_headers);
    sheet2.getRange(2,1, moveData.length, untagged_data[0].length).setValues(moveData);
  }   

  let retrieved_untagged_data = retrieveEntries();
  var conversion = converter(untagged_headers[0], validData, retrieved_untagged_data);

  var jsonOutput = conversion[0];
  var put_requests = conversion[1];
  Logger.log("All responses are converted to JSON: \n" + jsonOutput);
  
  if(jsonOutput.length == 0){
    Logger.log("No new request to POST");
  }
  else{
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

  send_put_requests(put_requests);

}
