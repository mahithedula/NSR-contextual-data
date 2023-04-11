/*
* Validates if a number is a zipcode
* Parameter: num - number
* Returns: boolean of whether its a zipcode
*/

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

// function initializeRequiredColumns() {
//   let requiredColumns = [0,1,2,3,4,5,6,7,9,11,13,15];
//   for (let i=0; i < requiredColumns.length ; i++ )
//     requiredColumnsSet.add(requiredColumns[i]);
// }


/*
* Validates each row of the data
* Parameters: 
* - row: array representing the row of the data to be validated
* 
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
  return "";
}

/*
* Checks all the rows of the data
* Parameters:
* - data: Data of the first sheet with untagged responses
* - required: Indices of required columns
* Returns: String of the error message or an empty string if inputs are valid
*/
function checkRows(data,required) {
  zipIndex = data[0].indexOf("Zip Code");
  
  response = "";

  //starting at 1 to avoid data 
  for (i=1; i<data.length; i++){
    response = checkRow(data[i], zipIndex, required);
    //Error message received
    if(response !== ""){
      return response;
    }
  }
  return "";
}
  
