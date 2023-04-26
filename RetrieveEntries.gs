function retrieveEntries() {
  var options = {
    method: "GET",
    headers: {
      "Authorization": "Token " + api_token
    }
  }
  var response = UrlFetchApp.fetch('https://vibrancy.newsunrising.org/api/community-context-surveys/', options);
  var data = JSON.parse(response.getContentText()).results;
  var retrieved_untagged_data = data.filter(function(entry) {
    var i = 0;
    while(entry["data"] != null && entry["data"][i] != null){
      let SDG = entry["data"][i]["NSR Questions"][0];
      let Community_Capital = entry["data"][i]["NSR Questions"][1];
      if (SDG != null  && Community_Capital != null){
        if(SDG[1] === "" && Community_Capital[1]===""){
          return entry;
        }
      }
      i=i+1;
      //breaking after 50 records to avoid looking too far
      if(i>50){
        break;
      }
    }    
  });
  return retrieved_untagged_data;
}