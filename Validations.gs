let requiredColumnsSet = new Set();
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



function initializeRequiredSet() {
  let requiredColumns = [0,1,2,3,4,5,6,8,10,12,14];
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
