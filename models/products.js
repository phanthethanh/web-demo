var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product_sch = new Schema({
    p_name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    plu: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('products', product_sch);