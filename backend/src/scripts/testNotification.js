const https = require ('https');

const sendNotification = data => {

  return new Promise((resolve, reject) => {

    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic OWMxNDIzNTMtZGRlMC00Yjk4LTkyMTctNDBhMzQ5MmVkNDU2"
    };

    const options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/notifications",
      method: "POST",
      headers: headers
    };

    const req = https.request(options, res => {
      res.on('data', data => {
        resolve(JSON.parse(data))
      });
    });

    req.on('error', e => {
      reject(JSON.parse(e))
    });

    req.write(JSON.stringify(data));
    req.end();
  });
};

sendNotification({
  app_id: "27ccd574-12cd-4bc2-9f7e-988b6b92ad49",
  contents: { "en": 'Test' },
  // included_segments: ['All'],
  // include_player_ids: ['d406baf5-6119-4db7-be15-8d5c982b3bfe']
  include_player_ids: ['a52400c6-4de7-47be-bef8-b8220f48d1a6']
})
  .then(res=>{
    console.log('res !!!!',res);
  })
  .catch(res=>{
    console.log('err !!!!',res);
  })
