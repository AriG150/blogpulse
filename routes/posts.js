const express = require('express');
const router = express.Router();
const db = require('../models');

// file for POST model route

//All the POSTs
router.get('/', function(req, res){
    db.post.findAll()
        .then(function(posts){
            res.render('posts/index');
        });
});

//get one POST
//show.ejs
router.get('/:id', function(req, res){
    db.post.findByPk(parseInt(req.params.id)) // have to turn string into int, and then identifying by the id from there 
        .then(function(post) {
            post.getAuthor().then(function(author) {
                res.render('posts/show', {post, author})
            });
        });
});

//create new POST via form and post route
router.get('/new', function(req, res){
    res.render('posts/new');
});

// create new post associated with author and get new posts associated with author
//do this with pov of author


module.exports = router;