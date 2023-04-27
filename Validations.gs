/*
* Validates if a number is a zipcode
* Parameter: num - number
* Returns: boolean of whether its a zipcode
*/

function isZipCode(num) {
  if(typeof num != "number"){
    return false;
  }
  if(num >= 10000 && num <= 99999){
    return true;
  }
  return false;
}

/*
* Checks how many works are in a string, Returns true if less than 10
* Parameter: str - string
* Returns: boolean
*/
function wordsLimit15(str){
  numWords = str.split(" ").length;
  return (numWords <= 15);
}

/*
* Initializes the required columns array
* Parameters: 
* - data: Data of the first sheet with untagged responses
* Returns: array of the index numbers of required columns
*/
function initializeRequiredColumns(data) {
  let columnNames = ["Timestamp","Date","City","State","Zip Code",
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
  //check required columns and word length
  for(i=0; i<row.length; i++){
    if(i < required.length && row[required[i]] === ''){
      return "Required Columns not Filled at Row " + row + " and column " + required[i];
    }
    if(!wordsLimit15(String(row[i]))){
      return "Word limit exceeded at Row " + row + " and column " + i
    }
  }
  return "";
}

  

