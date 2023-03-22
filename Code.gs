function myFunction() { 

}

//taking in zipCode parameter, outputting boolean
function isZipCode(str) {
  if(typeof str != "string") {
    str.toString();
  }
  if(!str.isNaN() && str.length == 5){
    return True;
  }
  return False;
}
