require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const db = require('./models');

const app = express();


app.set('view engine', 'ejs');
app.use(express.static('static')); // css goes in here 
app.use(express.urlencoded({extended: false}));
app.use(ejsLayouts);

app.use('/authors', require('./routes/authors'));
app.use('/posts', require('./routes/posts'));
app.use('/comments', require('/routes/comments'));


app.listen(3000);
