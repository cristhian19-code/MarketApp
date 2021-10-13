const jwt = require('jsonwebtoken');

const VerifyToken = async (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) res.status(401).json({
        message: 'Acceso denegado',
        error: true
    });

    try {
        const verify = await jwt.verify(token, 'TOKEN_SECRET');

        next();
    } catch (error) {
        res.json({
            message: 'Token incorrecto',
            error: true
        })
    }
}

module.exports = {
    VerifyToken
}
