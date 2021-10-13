const mongoose = require('mongoose');
const username = 'apiTienda'
const password = 'K1ToCaCWPYoLNdst'
const DBname = 'Tienda'

const uri = `mongodb+srv://${username}:${password}@cluster0.ro5vj.mongodb.net/${DBname}?retryWrites=true&w=majority`
const options = {
    useNewUrlParser:true,
    useUnifiedTopology: true
}

mongoose.connect(uri,options).then((result)=>{
    console.log('Base de datos conectada');
}).catch((err)=>{
    console.log(err);
})

module.exports = mongoose;