var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Code = mongoose.model('Code');
var Les = mongoose.model('Les');
var Opdracht = mongoose.model('Opdracht');
var GemaakteOpdracht = mongoose.model('GemaakteOpdracht');
var User = mongoose.model('User');

var jwtCheck = jwt({
  secret: new Buffer('sNEAo2P3lGV-Zp80LwlfTMmLlL0mwgzWzy-mp2e_628H4ugZDlYjj11bIUu__rq0', 'base64'),
  audience: 'z2pYYzga31lsxKxEJsXt8vPmWOyUXAEP'
});

/*Post lessons*/
router.post('/lessons', jwtCheck, function(req, res, next){
    var lesson = new Les(req.body);
    lesson.save(function(err, lesson){
        if(err){ return next(err); }
        
        res.json(lesson);
    });
});
/*Retrieve lessons*/
router.get('/lessons', jwtCheck, function(req, res, next){
    Les.find(function(err, lessons){
        if(err){return next(err); }
        
        res.json(lessons);
    });
});

/*preload lesson objects on routes with ':lesson'*/
router.param('lesson', function(req, res, next, id){
    var query = Les.findById(id);
    
    query.exec(function (err, lesson){
        if (err) {return next(err); }
        if (!lesson) {return next (new Error('can\'t find lesson')); }
        
        req.lesson = lesson;
        return next();
    });
});

/*Post opdracht*/
router.post('/lessons/:lesson/opdrachten', jwtCheck, function(req, res, next){
    var exercise = new Opdracht(req.body);
    exercise.lesId = req.lesson;
    exercise.save(function(err, exercise){
        if(err){ return next(err); }
        
        req.lesson.opdrachten.push(exercise);
        req.lesson.save(function(err, lesson) {
            if(err){ return next(err); }
            
            res.json(lesson);
        });
    });
});

// Preload exercise objects on routes with ':opdracht'
router.param('opdracht', jwtCheck, function(req, req, next, id){
    var query = Opdracht.findById(id);
    
    query.exec(function (err, opdracht){
        if (err) {return next(err); }
        if (!opdracht) {return next (new Error('can\'t find exercise')); }
        
        req.opdracht = opdracht;
        return next();
    });
});

/*return a lesson*/
router.get('/lessons/:lesson', function(req, res, next){
    req.lesson.populate('opdrachten', function(err, lesson) {
        res.json(lesson);
    });
});

/*Post ingeleverde opdracht*/
router.post('/lessons/:lesson/inleverenOpdrachten', function(req, res, next){
    var exercise = new GemaakteOpdracht(req.body);
    exercise.lesID = req.lesson;
    exercise.save(function(err, exercise){
        if(err){ return next(err); }
        req.lesson.gemaakteOpdrachten.push(exercise);
        req.lesson.save(function(err, lesson) {
            if(err){ return next(err); }
            
            res.json(lesson);
        });
    });
});

/*return a lesson with finished exercises*/
router.get('/lessons/:lesson/inleverenOpdrachten', jwtCheck, function(req, res, next){
    req.lesson.populate('gemaakteOpdrachten', function(err, lesson) {
        req.lesson.populate('opdrachten', function(err, lesson) {
            res.json(lesson);
        })
    });
});

module.exports = router;
