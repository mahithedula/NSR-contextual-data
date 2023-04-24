function converter(headers, data) {
  var output = [];
  Logger.log(data);
  
  for (var i = 0; i < data.length; i++) {

    //array to store nsr specific questions
    const nsr_qs = [];

    //array to store client organization questions
    const org_qs = [];

    //array to store general fields (date, address, zip)
    const gen_qs = [];

    var row = {};
    row["id"] = Utilities.getUuid();

    //gets indices of last questions in sections
    var gen_question_end = row.indexOf("Zip Code")
    var org_question_index = row.indexOf("Are you providing feedback as part of a specific project or organization?")

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
            

    output.push(row);
  }

  var jsonString = JSON.stringify(output);
  return jsonString;
}
