const express = require('express');
const router = express.Router();
const db = require('../models');

// file for POST model route

//All the POSTs
router.get('/', function(req, res){
    db.post.findAll()
        .then(function(post){
            res.render('posts/show', {post, author});
        });
});

//get one POST
//show.ejs
router.get('/:id', function(req, res){
  console.log(`🚌 Get 1 route hit`)
    db.post.findByPk(parseInt(req.params.id)) // have to turn string into int, and then identifying by the id from there 
        .then(function(post) {
            post.getAuthor().then(function(author) {
                post.getComments().then(function(comments){
                  res.render('posts/show', {post, author, comments})
                  
                })
            });
        });
});



//create new GET via form and post route

// router.get('/new', function(req, res){
//     res.render('posts/new');
// });

//COMMENTS PORTION WITHIN THE posts PAGE 

//GET information about the comment, from the form in show.ejs, and put in the 'posts' page 
// router.get('/:id', function(req, res){
//   db.comments.findByPk(parseInt(req.params.id))
//     .then(function(comments){
//       comments.getPost().then(function(post) {
//         res.render('posts/show', {post, comments})
//       })
//     })
// })



// POST a new comment upon the posts page 
//TODO: FIX! DOESN'T WORK

router.post('/:id/comments', function(req, res){
  db.post.findByPk(parseInt(req.params.id))
    .then(function(post){
      post.createComment(req.body).then(function(comment){
        res.redirect(`/posts/${req.params.id}`)
      })
    })
})






module.exports = router;