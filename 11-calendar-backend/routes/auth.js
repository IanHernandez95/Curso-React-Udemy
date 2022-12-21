/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const { validaJWT } = require('../middlewares/validar-jwt');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

const router = Router();

router.post(
    '/new', 
    [ //Middelwares
        check('name','El nombre debe ser obligatorio').not().isEmpty(),
        check('email','El email debe ser obligatorio').isEmail(),
        check('password','El password debe ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ] , 
    crearUsuario );

router.post(
    '/',
    [ //Middelwares
        check('email','El email debe ser obligatorio').isEmail(),
        check('password','El password debe ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ] ,
    loginUsuario);

router.get('/renew', validaJWT ,revalidarToken );

module.exports = router;