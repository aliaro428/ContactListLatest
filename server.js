var express = require('express');
var myApp = express();
var mongojs = require('mongojs');
var maxmind = require('maxmind');

var db = mongojs('view', ['view']);
var bodyParser = require('body-parser');
myApp.use(express.static(__dirname + "/public"));
myApp.use(bodyParser.json());

maxmind.open('/path/GeoLite2-City.mmdb', (err, cityLookup) => {
  var city = cityLookup.get('66.6.44.4');
});
maxmind.open('/path/GeoLite2-Country.mmdb', (err, countryLookup) => {
  var city = countryLookup.get('66.6.44.4');
});


myApp.post('/view', function (req, res) {
  console.log(req.body);
  db.contactList.insert(req.body, function (err, doc) {
    res.json(doc);
  })
});

myApp.delete('/view/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactList.remove({ _id: mongojs.ObjectId(id) }, function (err, doc) {
    res.json(doc);
  });
});

myApp.get('/view/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactList.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
    res.json(doc);
  });
});

myApp.listen(3000)
console.log("server running on port 3000");