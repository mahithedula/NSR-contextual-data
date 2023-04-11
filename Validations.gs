let requiredColumnsSet = new Set();
//taking in zipCode parameter, outputting boolean
function isZipCode(num) {
  Logger.log(num);
  if(typeof num != "number"){
    return false;
  }
  if(num >= 10000 && num <= 99999){
    return true;
  }
  return false;
}

function validZipCodes(URL, data){
  var spreadsheet = SpreadsheetApp.openByUrl(URL);
  var sheet = spreadsheet.getSheets()[0];
  var firstRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var zipCode = firstRow.indexOf("Zip Code");
  for(let i=1; i< data.length; i++){
    if(!isZipCode(data[i][zipCode])){
      Logger.log(data[i][zipCode]);
      return false;
    }
  }
  return true;
}

function initializeRequiredSet() {
  let requiredColumns = [0,1,2,3,4,5,6,7,9,11,13,15];
  for (let i=0; i < requiredColumns.length ; i++ )
    requiredColumnsSet.add(requiredColumns[i]);
}

function requiredColumnsFilled(data, required = requiredColumnsSet){
  if (required.size == 0){
    initializeRequiredSet();
  }
  for(let i=1; i < data.length; i++){
    for(let j=0; j<data[0].length; j++){
      if(data[i][j]===''){
        if(requiredColumnsSet.has(j)){
          return false;
        }
      }
    }
  }
  return true;
}

/*
* Validates each row of the data
* Parameters: 
* - row: array representing the row of the data to be validated
* - zipIndex: index of the zipcode
* - required: array of the index numbers of required columns
* Returns: Empty string if valid or the error message if invalid
*/
function checkRow(row, zipIndex, required){
  //check the zipCode
  if(!isZipCode(row[zipIndex])){
    return "Invalid ZipCode at Row " + r;
  }
  //check required columns
  for(i=0; i<required.length; i++){
    if(row[required[i]] === ''){
      return "Required Columns not Filled at Row " + r + " and column " + i;
    }
  }
}

/*
* Checks all the rows of the data
* Parameters:
*
* Returns: 
*/