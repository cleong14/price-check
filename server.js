var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var api = require('./lib/api');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended:true }));

app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/products', function (request, response) {

  var lat = request.query.latitude;
  var lng = request.query.longitude;
  console.log(lat, lng);

  response.json(api.getProducts(lat, lng));
});


app.listen(3000);

module.exports = app;
