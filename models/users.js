var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user_sch = new Schema({
    userid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('users', user_sch);