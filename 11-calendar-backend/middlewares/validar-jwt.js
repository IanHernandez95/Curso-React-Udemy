const { response, json } =  require('express');
const jwt = require('jsonwebtoken')

const validaJWT = ( req, res = response, next ) => {

    // x-token headers
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            of: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid
        req.name = name
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'token no valido'
        })
    }

    next();

}


module.exports = {
    validaJWT
}