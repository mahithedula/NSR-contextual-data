//taking in zipCode parameter, outputting boolean
function isZipCode(str) {
  if(typeof str != "string") {
    str.toString();
  }
  if(!isNaN(str) && str.length == 5){
    return true;
  }
  return false;
}
