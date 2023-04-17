function converter(headers, data) {
  var output = [];
  
  for (var i = 0; i < data.length; i++) {

    const nsr_qs = [];
    const org_qs = [];
    const gen_qs = [];
    const gen_rs = [];
    const org_rs = [];
    const nonorg_rs = [];

    var row = {};
    row["id"] = Utilities.getUuid();

    //row["Timestamp"] = firstRow.indexOf("Community Capital")

    for (var j = 0; j < headers.length; j++) {
      if(j < 2) {
        nsr_qs.push([headers[j], data[i][j]]);
      }
      else if(j < 7) {
        gen_qs.push([headers[j], data[i][j]]);
      }
      else if(j < 19) {
        nsr_qs.push([headers[j], data[i][j]]);
      }
      else if(data[i][j] != "" && j != 19) {
        org_qs.push([headers[j], data[i][j]]);
      }

    }

    row["General Fields"] = gen_qs;
    row["NSR Questions"] = nsr_qs;
    row["Org"] = data[i][19]
    row["Org Questions"] = org_qs;
            

    output.push(row);
  }

  var jsonString = JSON.stringify(output);
  return jsonString;
}
