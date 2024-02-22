const validarCampos = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validar-jwt");
const validaRoles = require("../middlewares/validar-roles");
const validarArchivoSubir = require("../middlewares/validad-archivo")

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
    ...validarArchivoSubir,
}