var request = require('sync-request');
var uberApiUrl = 'https://sandbox-api.uber.com/v1/';
var uberServerToken = process.env.UBER_SERVER_TOKEN;
var uberClientID = process.env.UBER_CLIENT_ID;
var uberClientSecret = process.env.UBER_CLIENT_SECRET;

console.log(uberServerToken);

module.exports = {
  getProducts: getProducts
};

function getProducts (latitude, longitude) {
  var url = uberApiUrl + 'products';
  var result = request('GET', url, {
    strictSSL: false,
    qs: {
      server_token: uberServerToken,
      latitude: latitude,
      longitude: longitude
    }
  });

  return JSON.parse(result.getBody('utf8'));
}
