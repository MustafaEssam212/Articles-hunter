const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: {required: true, type: String},
    articleText: {required: true, type: String},
    author: {required: true, type: String},
    username: {required: true, type: String},
    date: {type: String}
})


module.exports = mongoose.model('Articles', ArticleSchema)