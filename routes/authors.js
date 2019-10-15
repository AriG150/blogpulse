const express = require('express');
const router = express.Router();
const db = require('../models');

//GET /authors (layout.ejs)
router.get('/', function(req, res){
    db.author.findAll()
      .then(function(authors){
          // res.render('authors/index', {authors: authors});  // below is using the object literal notation
          res.render('authors/index', {authors});
      })
});

//GET /new - author can post name and mustache size
router.get('/new', function(req, res){
    res.render('authors/new');
});

// POST /authors (new.ejs)
router.post('/', function(req, res){
    db.author.create(req.body)
        .then(function(author) {
            res.redirect('/authors');
        });
});

// read one authors information 
//lookup on author and see list of what they're written 
// post here refers to model  (show.ejs)
// getPosts refers to post model. If model was pokemon it would be getPokemon
router.get('/:id', function(req, res) {
    db.author.findByPk(parseInt(req.params.id))
        .then(function(author){
          author.getPosts().then(function(posts) {
            res.render('authors/show', {author, posts});
          });
        });
});


// POST /:id/posts 
//show.ejs. createPost refers to model. if model was pokemon it would be a createPokemon
router.post('/:id/posts', function(req, res){
  db.author.findByPk(parseInt(req.params.id))
    .then(function(author) {
      author.createPost(req.body).then(function(post){
        res.redirect(`/authors/${req.params.id}`);
      })
    })
})

module.exports = router;