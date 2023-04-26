function send_put_requests(put_requests){
  if(put_requests.length == 0){
    Logger.log("No updated entries");
    return;
  }
  for(var i=0; i<put_requests.length; i++){
    var put_id = put_requests[i]["id"];
    var output = jsonStringify(put_requests[i]);

    var options = {
      method: "PUT",
      muteHttpExceptions: true, 
      headers: {
        "Authorization": "Token " + api_token
      },
      payload: {id: put_id, org: null, data: output}
    }

    var response = UrlFetchApp.fetch('https://vibrancy.newsunrising.org/api/community-context-surveys/', options);
    Logger.log("Sent with response: " + response);
  }  
}
