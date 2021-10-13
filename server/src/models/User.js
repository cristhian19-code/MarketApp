const mongoose = require('../database');
const moment = require('moment');
const avatar = ['https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
                'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'];

const index = Math.floor(Math.random() * (1 - 0))

const User = mongoose.Schema({
    avatar: {
        type: String,
        default: avatar[index]
    },
    lastname: {
        type: String
    },
    firstname: {
        type: String
    },
    phone: {
        type: Number
    },
    sex: {
        type: String
    },
    age: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    date: {
        type: String,
        default: moment(Date.now()).format('L')
    }
})

module.exports = mongoose.model('Users', User)