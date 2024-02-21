const {Router} = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos, esAdminRol } = require("../middlewares");

const { crearProducto,
        obtenerProductos, 
        obtenerProducto,
        actualizarProducto, 
        eliminarProducto, } = require("../controllers/productos");
        
const { existeProductoPorId, existeCategoriaPorId } = require("../helpers/db-validators");

const router = Router();

// Obtener todos los productos - publico
router.get("/", obtenerProductos);

// Obtener un producto por id - publico
router.get("/:id",[
    check("id", "No es un id valido de Mongo").isMongoId(),
    validarCampos,
    check("id").custom(existeProductoPorId),
    validarCampos,
], obtenerProducto);
// Crear producto - privado - cualquier persona con un token valido
router.post("/",[
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id valido de Mongo").isMongoId(),
    validarCampos,
    check("categoria").custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

// Actualizar producto - privado - cualquiera con token valido
router.put("/:id", [
    validarJWT,
    // check("categoria", "No es un id valido de Mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos
], actualizarProducto);

// Borrar un producto - Admin
router.delete("/:id",[
    validarJWT,
    esAdminRol,
    check("id", "No es un ID valido").isMongoId(),
    validarCampos,
    check("id").custom(existeProductoPorId),
    validarCampos
], eliminarProducto);

module.exports = router;