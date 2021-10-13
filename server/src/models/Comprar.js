const mongoose = require('../database')
const moment = require('moment')

const Compra = mongoose.Schema({
    productos: [
        {
            name: {
                type: String,
            },
            price: {
                type: Number
            },
            cant: {
                type: Number
            }
        }
    ],
    date: {
        type: String,
        default: moment(Date.now()).format('L')
    },
    id: {
        type: String
    },
    total: {
        type: Number
    }
})

module.exports = mongoose.model('Compra', Compra)