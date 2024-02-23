const { Router } = require("express");
const { check } = require("express-validator");

// Importar middlewares personalizados
const { 
  validarJWT,
  validarCampos,
  esAdminRol,
} = require("../middlewares");

// Importar controladores de categorías
const { 
  crearCategoria, 
  actualizarCategoria, 
  eliminarCategoria, 
  obtenerCategorias, 
  obtenerCategoria,
} = require("../controllers");

// Importar funciones de validación de la base de datos
const { existeCategoriaPorId } = require("../helpers");

const router = Router();

// Obtener todas las categorías - público
router.get("/", obtenerCategorias);

// Obtener una categoría por id - público
router.get("/:id",[
    // Validar que el id sea un id válido de Mongo y verificar si la categoría existe por id
    check("id", "No es un id válido de Mongo").isMongoId(),
    validarCampos,
    check("id").custom(existeCategoriaPorId),
    validarCampos,
], obtenerCategoria);

// Crear categoría - privado - cualquier persona con un token válido
router.post("/",[
    // Validar el token JWT y la existencia de campos obligatorios
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar categoría - privado - cualquiera con token válido
router.put("/:id", [
    // Validar el token JWT, la existencia de campos obligatorios y que el id sea un id válido de Mongo
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
    check("id").custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria);

// Borrar una categoría - Admin
router.delete("/:id",[
    // Validar el token JWT, verificar rol de administrador, id válido de Mongo y existencia de la categoría por id
    validarJWT,
    esAdminRol,
    check("id", "No es un ID válido").isMongoId(),
    validarCampos,
    check("id").custom(existeCategoriaPorId),
    validarCampos
], eliminarCategoria);

module.exports = router;