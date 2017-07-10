var express = require('express');
var myApp = express();
var mongojs = require('mongojs');
var db = mongojs('contactList', ['contactList']);
var bodyParser = require('body-parser');
myApp.use(express.static(__dirname + "/public"));
myApp.use(bodyParser.json());

myApp.get('/contactList', function (req, res) {
  console.log("hello i received a get request")
  db.contactList.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  })
})

myApp.post('/contactList', function (req, res) {
  console.log(req.body);
  db.contactList.insert(req.body, function (err, doc) {
    res.json(doc);
  })
});

myApp.delete('/contactList/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactList.remove({ _id: mongojs.ObjectId(id) }, function (err, doc) {
    res.json(doc);
  });
});

myApp.get('/contactList/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactList.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
    res.json(doc);
  });
});

myApp.listen(3000)
console.log("server running on port 3000");