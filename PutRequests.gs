function send_put_requests(put_requests){
  if(put_requests.length == 0){
    Logger.log("No updated entries");
    return;
  }
  for(var i=0; i<put_requests.length; i++){
    var put_id = put_requests[i]["id"];
    var output = JSON.stringify(put_requests[i]);

    var options = {
      method: "put",
      muteHttpExceptions: true, 
      headers: {
        "Authorization": "Token " + api_token
      },
      payload: {org: null, data: output}
    }
    var put_URL = 'https://vibrancy.newsunrising.org/api/community-context-surveys/'+ put_id + '/';
    var response = UrlFetchApp.fetch(put_URL, options);
    Logger.log(put_URL);
    Logger.log("Sent with response: " + response);
  }  
}
