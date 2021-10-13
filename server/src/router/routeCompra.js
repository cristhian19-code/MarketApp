const router = require('express').Router();
const Compra = require('../models/Comprar');

router.post('/compra', async (req, res) => {
    const { productos, total, id } = req.body;

    const compras = await new Compra({
        productos,
        total,
        id
    })

    const save = await compras.save();

    res.json({
        message: 'Compra exitosa',
        error: false
    })
})

router.post('/mis-compras', async (req, res) => {
    const myShopping = await Compra.find({ id: req.body.id });

    res.json({
        data: myShopping,
        error: false
    })
})

module.exports = router
