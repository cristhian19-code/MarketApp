const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//ruta para registrarse en la tienda
router.post('/signup',async (req,res)=>{
    const {email,password} = req.body;
    
    const validation = await User.findOne({email})

    if(validation) return res.status(400).json({
        data: null,
        error: true
    })

    const salt = await bcrypt.genSalt(5)
    
    const passwordHash = await bcrypt.hash(password,salt);
    req.body.password = passwordHash
    
    const user = await new User(req.body)

    const save = await user.save();

    res.json({
        data: save.firstname,
        error: false
    })
})

//ruta de acceso a datos del usuario
router.post('/acceso',async (req,res)=>{
    const token = req.header('auth-token');

    if(!token) return res.status(401).json({
        data: null,
        error: true,
        message: 'No hay token'
    })

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);

        res.json({
            data: verified
        })

    } catch (error) {
        res.status(400).json({
            data: null,
            error: true,
            message: 'Token incorrecto'
        })
    }
})

//ruta para logearse en la pagina
router.post('/login',async (req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    const validar = await bcrypt.compare(password, user.password);

    if(!validar) return res.status(400).json({
        data: null,
        error: true
    })

    const token = jwt.sign({
        email: user.email,
        name: user.firstname,
        avatar: user.avatar,
        id: user._id
    },process.env.TOKEN_SECRET)   

    res.header('auth-token',token).json({
        data: user.firstname,
        error: false,
        token
    })
})

module.exports = router