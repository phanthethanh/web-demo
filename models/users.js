var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var user_sch = new Schema({
    userid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

user_sch.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

user_sch.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', user_sch);