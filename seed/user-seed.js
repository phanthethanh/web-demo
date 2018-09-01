var User = require('../models/users');
var mongoosedb = require('mongoose');

// Connection URL
var url_mongodb = 'mongodb://localhost:27017/shop';
mongoosedb.connect(url_mongodb);

var users = [
    new User({
        userid: "em",
        password: "em",
        name: "NGUYEN PHUONG",
        email: "nguyen-phuong@gmail.com",
        address: "FUKUOKA",
        age: 20
    })
];

var done = 0;
for(var i = 0; i < users.length; i++){
    users[i].save(function(err, result){
        done++;
        if(done === users.length){
            exit();
        }
    })
};
function exit(){
    mongoosedb.disconnect();
}
