const router = require('express').Router();
const Producto = require('../models/Producto')
const User = require('../models/User');
const moment = require('moment')
const jwt = require('jsonwebtoken');

//hacer un comentario a un producto
router.post('/comment', async (req, res) => {
    const {_id, id_user, comment, email} = req.body;

    const token = req.header('auth-token');

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    if (verified.email != email) return res.status(401).json({
        message: 'Token invalido'
    })

    try {
        const product = await Producto.findOne({_id});
        const user = await User.findOne({"_id": id_user});

        const commentSchema = {
            comment,
            "avatar": user.avatar,
            "name": user.firstname,
            "date": moment(Date.now()).format('L')
        }

        await product.comments.push(commentSchema)

        await product.save()

        res.json({
            message: 'Mensaje guardado',
            error: false
        })

    } catch (error) {
        res.status(401).json({
            message: 'Producto o usuario no encontrado',
            error: true
        })
    }

})

//agregar un producto a la BD
router.post('/addproduct', async (req, res) => {
    const product = await new Producto(req.body);
    product.save()

    res.json({
        data: product
    })
})

//obtener todos los productos
router.get('/allproducts', async (req, res) => {
    const products = await Producto.find();

    res.json({
        data: products
    })
})


module.exports = router;
