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

/*
* Initializes the required columns array
* Parameters: 
* - data: Data of the first sheet with untagged responses
* Returns: array of the index numbers of required columns
*/
function initializeRequiredColumns(data) {
  let columnNames = ["SDG","Community Capital","Timestamp","Date","City","State","Zip Code",
	"What is the name of your community's geography or issue/identity that you are reflecting on during this survey? (3 words or less)","Are you providing feedback as part of a specific project or organization?","Where do you see assets, strength, beauty, and/or opportunity in your community? (be brief, 10 words of less)","What are the barriers and/or challenges in your community? (be brief, 10 words of less)","What do you hope for your community? (be brief, 10 words or less)","What do you fear for your community? (be brief, 10 words or less)","What do you expect from your community? (be brief, 10 words or less)]"]
  var required = [];
  for(i=0; i<columnNames.length; i++){
    required.push(data[0].indexOf(columnNames[i]));
  }
  return required;
}

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
    return "Invalid ZipCode at Row " + row;
  }
  //check required columns
  for(i=0; i<required.length; i++){
    if(row[required[i]] === ''){
      return "Required Columns not Filled at Row " + row + " and column " + required[i];
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
  
