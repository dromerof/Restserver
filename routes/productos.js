const { Router } = require("express");
const { check } = require("express-validator");

// Importar middlewares personalizados
const {
  validarJWT,
  validarCampos,
  esAdminRol,
} = require("../middlewares");

// Importar controladores de productos
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers");

// Importar funciones de validación de la base de datos
const {
  existeProductoPorId,
  existeCategoriaPorId,
} = require("../helpers");

// Crear una instancia de Router
const router = Router();

// Obtener todos los productos - público
router.get("/", obtenerProductos);

// Obtener un producto por id - público
router.get("/:id", [
    // Validar que el id sea un id válido de Mongo y verificar si el producto existe por id
    check("id", "No es un id válido de Mongo").isMongoId(),
    validarCampos,
    check("id").custom(existeProductoPorId),
    validarCampos,
], obtenerProducto);

// Crear producto - privado - cualquier persona con un token válido
router.post("/", [
    // Validar el token JWT y la existencia de campos obligatorios
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "No es un id válido de Mongo").isMongoId(),
    validarCampos,
    check("categoria").custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

// Actualizar producto - privado - cualquiera con token válido
router.put("/:id", [
    // Validar el token JWT y verificar si el producto existe por id
    validarJWT,
    // check("categoria", "No es un id válido de Mongo").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos
], actualizarProducto);

// Borrar un producto - Admin
router.delete("/:id", [
    // Validar el token JWT, verificar rol de administrador, id válido de Mongo y existencia del producto por id
    validarJWT,
    esAdminRol,
    check("id", "No es un ID válido").isMongoId(),
    validarCampos,
    check("id").custom(existeProductoPorId),
    validarCampos
], eliminarProducto);

module.exports = router;