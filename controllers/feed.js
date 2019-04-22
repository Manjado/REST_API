const { validationResult } = require('express-validator/check');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            {
                _id: '1',
                title: 'First Post',
                content: 'This is the first post!',
                imageUrl: 'images/js.jpg',
                creator: {
                    name: 'Michael'
                },
                createdAt: new Date()
            }
        ]
    });
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw  error;
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title,
        content,
        imageUrl: 'images/js.jpg',
        creator: { name: 'Michael'},
    });
    post.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Post created successfully!',
            post: result
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err) // in async you have to use next and pass err => middleware error in app.js
    })

};