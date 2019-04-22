const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');

const app = express();

//app.use(bodyParser.urlencoded()); //x-www-form-urlencoded <form>
app.use(bodyParser.json()); //application/json
app.use('/images',express.static(path.join(__dirname, 'images')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Autorization');
    next();
});

app.use('/feed', feedRoutes);

mongoose
    .connect(
     'mongodb+srv://Michael:b8sSmwk7I7wz7hpf@cluster0-flk3y.mongodb.net/blog'
    )
    .then(result => {
        app.listen(8080);
    }).catch(err => console.log(err));

