var Product = require('../models/products');
var mongoosedb = require('mongoose');
//var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url_mongodb = 'mongodb://localhost:27017/shop';
/*MongoClient.connect(url_mongodb, function(err, database) {
    if(err) throw err;
  });*/
mongoosedb.connect(url_mongodb);

var products = [
    new Product({
        p_name: "Em Phuong",
        img: "/public/images/t05.jpg",
        title: "giay cong so",
        description: "da loai 1",
        price: "200$",
        type: 2,
        plu: "d03",
        origin: "Viet Nam"
    })
];

var done = 0;
for(var i = 0; i < products.length; i++){
    products[i].save(function(err, result){
        done++;
        if(done === products.length){
            exit();
        }
    })
};
function exit(){
    mongoosedb.disconnect();
}
