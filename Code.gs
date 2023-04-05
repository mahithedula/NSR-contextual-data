
const URL = "https://docs.google.com/spreadsheets/d/1ZSX-3UuxJnq0ti0HF-J5Mvyh5BtJ3OyeSt2dDP-EI3o/edit?resourcekey#gid=142789237";


function myFunction() {
  /**
   * Converts the given form URL into a JSON object.
   */
  var sheet = SpreadsheetApp.openByUrl(URL);
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues()
  
  if(!validZipCodes(URL, data)){
    Logger.log('Zip Codes not correct');
    return
  }
  if(!requiredColumnsFilled(data)){
    Logger.log('Required columns not filled');
    return;
  }
  var jsonOutput = converter(URL);
  Logger.log("All responses are converted to JSON: \n" + jsonOutput);

  moveData(URL);
  Logger.log("Tagged data are moved to sheet 2");

  // var options = {
  //   method: "PUT",
  //   muteHttpExceptions: true, 
  //   headers: {
  //     "Authorization": "Token 0848ea8805a48b780f32f3742851a1fe3f8d233e"
  //   },
  //   payload: {org: 1, data: jsonOutput}
  // }
  // var response = UrlFetchApp.fetch('https://vibrancy.newsunrising.org/api/community-context-surveys', options);
  // Logger.log("Sent with response: " + response);

}
