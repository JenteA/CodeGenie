var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Code = mongoose.model('Code');
var Les = mongoose.model('Les');
var Opdracht = mongoose.model('Opdracht');
var GemaakteOpdracht = mongoose.model('GemaakteOpdracht');
var User = mongoose.model('User');


var MongoClient = require('mongodb').MogoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost/Admin';



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*Post Assignment*/

module.exports = router;
