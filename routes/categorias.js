const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos, esAdminRol } = require("../middlewares");

const { crearCategoria, 
        actualizarCategoria, 
        eliminarCategoria, 
        obtenerCategorias, 
        obtenerCategoria } = require("../controllers/categorias");

const { existeCategoriaPorId } = require("../helpers/db-validators");

const router = Router();

// Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

// Obtener una categoria por id - publico
router.get("/:id",[
    check("id", "No es un id valido de Mongo").isMongoId(),
    validarCampos,
    check("id").custom(existeCategoriaPorId),
    validarCampos,
], obtenerCategoria);

// Crear categoria - privado - cualquier persona con un token valido
router.post("/",[
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar - privado - cualquiera con token valido
router.put("/:id", [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
    check("id").custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria);

// Borrar una categoria - Admin
router.delete("/:id",[
    validarJWT,
    esAdminRol,
    check("id", "No es un ID valido").isMongoId(),
    validarCampos,
    check("id").custom(existeCategoriaPorId),
    validarCampos
], eliminarCategoria);

module.exports = router;