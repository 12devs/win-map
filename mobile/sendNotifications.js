var sendNotification = function(data) {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic OWMxNDIzNTMtZGRlMC00Yjk4LTkyMTctNDBhMzQ5MmVkNDU2"
  };

  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };

  var https = require('https');
  var req = https.request(options, function(res) {
    res.on('data', function(data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });

  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });

  req.write(JSON.stringify(data));
  req.end();
};

var message = {
  app_id: "27ccd574-12cd-4bc2-9f7e-988b6b92ad49",
  contents: {"en": "English Message"},
  included_segments: ["All"]
};

sendNotification(message);
