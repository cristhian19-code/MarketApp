const app = require('express')();
const morgan = require('morgan')
const bodyparse = require('body-parser')
require('dotenv').config()
const cors = require('cors')

app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200
}))

app.set('port',5000)

//config
app.use(bodyparse.urlencoded({extended:false}));
app.use(bodyparse.json());

//middleware
app.use(morgan('dev'));

//rutas
app.use(require('./router/routeUser'));
app.use(require('./router/routeCompra'));
app.use(require('./router/routeProducto'));

module.exports = app
