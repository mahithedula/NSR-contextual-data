
function filtering_put_requests(timestamp, retrieved_untagged_data){ 
  //filtering through retrieved_untagged_data
  for(var index = 0; index < retrieved_untagged_data.length; index++){
    var entry = retrieved_untagged_data[index];
    var entry_index = 0;
    while(entry["data"] != null && entry_index < entry["data"].length ){
      var retrieved_timestamp = entry["data"][entry_index]["Org Questions"][0][1]
      var retrieved_timestamp = Date.parse(retrieved_timestamp); 
      var timestamp = Date.parse(timestamp);
      var diff = retrieved_timestamp - timestamp;
      Logger.log("B" + retrieved_timestamp-timestamp)
      if(diff < 10000 && diff >-10000){
        return entry["id"];
      }
      entry_index++;
    }
  }
  return "";
}



function converter(headers, data, retrieved_untagged_data) {
  var output = [];
  var put_requests = [];
  for (var i = 0; i < data.length; i++) {

    //array to store nsr specific questions
    const nsr_qs = [];

    //array to store client organization questions
    const org_qs = [];

    //array to store general fields (date, address, zip)
    const gen_qs = [];

    var timestamp = data[i][2];
    var put_request_id = filtering_put_requests(timestamp, retrieved_untagged_data);

    var row = {};
    if(put_request_id !== ""){
      row["id"] = put_request_id;
    }
    else{
      row["id"] = Utilities.getUuid();
    }

    //gets indices of last questions in sections
    var gen_question_end = data[i].indexOf("Zip Code")
    var org_question_index = data[i].indexOf("Are you providing feedback as part of a specific project or organization?")

    for (var j = 0; j < headers.length; j++) {

      //store questions/responses in the correct array
      if(j < 2) {
        nsr_qs.push([headers[j], data[i][j]]);
      }
      else if(j < gen_question_end) {
        gen_qs.push([headers[j], data[i][j]]);
      }
      else if(j < org_question_index) {
        nsr_qs.push([headers[j], data[i][j]]);
      }
      else if(data[i][j] != "" && j != org_question_index) {
        org_qs.push([headers[j], data[i][j]]);
      }

    }

    row["General Fields"] = gen_qs;
    row["NSR Questions"] = nsr_qs;
    row["Org"] = data[i][org_question_index]
    row["Org Questions"] = org_qs;
    
    if (put_request_id!==""){
      put_requests.push(row)
    }
    else{
      output.push(row);
    }
  }
  
  var jsonString = JSON.stringify(output);
  return [jsonString, put_requests];
}
