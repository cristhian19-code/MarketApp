const mongoose = require('../database');
const moment = require('moment');

const Producto = mongoose.Schema({
    url: {
        type: String
    },
    name: {
        type: String
    },
    description:{
        type: String,
        default: 'Sin descripcion'
    },
    price: {
        type: Number
    },
    comments: {
        type: Array,
        default: []
    },
    stock: {
        type: Number,
        default: 0
    },
    measurement:{
        type: String
    },
    date: {
        type: String,
        default: moment(Date.now()).format('L')
    },
})

module.exports = mongoose.model('Product',Producto)