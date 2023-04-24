function retrieveEntries() {
  var options = {
    method: "GET",
    headers: {
      "Authorization": "Token " + api_token
    }
  }
  var response = UrlFetchApp.fetch('https://vibrancy.newsunrising.org/api/community-context-surveys/', options);
  var data = JSON.parse(response.getContentText()).results;
  Logger.log(data);
  var untagged_data = data.filter(function(entry) {
    if(entry.Tag === ""){
      return entry;
    }
  });
  Logger.log(untagged_data);
}