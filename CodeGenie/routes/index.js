var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Code = mongoose.model('Code');
var Les = mongoose.model('Les');
var Opdracht = mongoose.model('Opdracht');
var GemaakteOpdracht = mongoose.model('GemaakteOpdracht');
var User = mongoose.model('User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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

/*get lesson ID*/
router.param('lesson', function(req, req, next, id){
    var query = Les.findById(id);
    
    query.exec(function (err, lesson){
        if (err) {return next(err); }
        if (!lesson) {return next (new Error('can\'t find lesson')); }
        
        req.lesson = lesson;
        return next();
    })
})

module.exports = router;
