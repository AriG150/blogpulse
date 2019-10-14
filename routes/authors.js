const express = require('express');
const router = express.Router();
const db = require('../models');

//GET /authors
router.get('/', function(req, res){
    db.author.findAll()
    .then(function(authors){
        // res.render('authors/index', {authors: authors});  // below is using the object literal notation
        res.render('authors/index', {authors});
    })
});

//GET /new - author can post name and mostache size
router.get('/new', function(req, res){
    res.redirect('authors/new');
});

// POST /authors 
router.post('/', function(req, res){
    db.author.create(req.body)
    .then(function(author) {
        res.redirect('/authors');
    });
});


module.exports = router;