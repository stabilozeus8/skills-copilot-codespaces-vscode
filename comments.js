// Create web server

// Import express
const express = require('express');
// Import body-parser
const bodyParser = require('body-parser');
// Import mongoose
const mongoose = require('mongoose');
// Import path
const path = require('path');

// Create express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });

// Import model
const Comment = require('./models/comment');

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// Set up body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set up routes
app.get('/', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) return console.log(err);
        res.render('index', { comments });
    });
});

app.post('/', (req, res) => {
    Comment.create(req.body, (err, comment) => {
        if (err) return console.log(err);
        res.redirect('/');
    });
});

// Listen on port 3000
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});