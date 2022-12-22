/*
    Events Routes
    /api/events
*/

const { Router } = require("express");
const { validaJWT } = require("../middlewares/validar-jwt");
const { getEvento, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const router = Router()

// Tiene que pasar por la validadcion del JWT
router.use( validaJWT )

// Obtener eventos
router.get('/', getEvento)


// Crear un nuevo evento
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es oblitatoria').custom( isDate ),
        check('end','Fecha de finalizacion es oblitatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento)


// Actualizar evento
router.put(
    '/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es oblitatoria').custom( isDate ),
        check('end','Fecha de finalizacion es oblitatoria').custom( isDate ),
        validarCampos
    ],actualizarEvento)


// Actualizar evento
router.delete('/:id', eliminarEvento)

module.exports = router;