var express = require('express');
var router = express.Router();

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

/*Post lessons*/
router.post('/lessons', function(req, res, next){
    var lesson = new Les(req.body);
    lesson.save(function(err, lesson){
        if(err){ return next(err); }
        
        res.json(lesson);
    });
});
/*Retrieve lessons*/
router.get('/lessons', function(req, res, next){
    Les.find(function(err, lessons){
        if(err){return next(err); }
        
        res.json(lessons);
    });
});

/*preload lesson objects on routes with ':lesson'*/
router.param('lesson', function(req, res, next, id){
    console.log('ik zit erin');
    var query = Les.findById(id);
    
    query.exec(function (err, lesson){
        if (err) {return next(err); }
        if (!lesson) {return next (new Error('can\'t find lesson')); }
        
        req.lesson = lesson;
        return next();
    });
});

/*Post opdracht*/
router.post('/lessons/:lesson/opdrachten', function(req, res, next){
    var exercise = new Opdracht(req.body);
    exercise.lesID = req.lesId;
    
    exercise.save(function(err, exercise){
        if(err){ return next(err); }
        
        req.lesId.opdrachten.push(exercise);
        res.lesId.save(function(err, exercise) {
            if(err){ return next(err); }
            
            res.json(exercise);
        });
    });
});

// Preload comment objects on routes with ':comment'
router.param('opdracht', function(req, req, next, id){
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
            console.log('gelukt');
        res.json(lesson);
    });
});

module.exports = router;
