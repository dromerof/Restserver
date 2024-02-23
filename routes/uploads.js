const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos, validarArchivoSubir } = require("../middlewares");
const { cargarArchivo, actualizarImagen, mostrarImagen } = require("../controllers");
const { coleccionesPermitidas } = require("../helpers");

const router = Router();

// Ruta para cargar un archivo (imagen)
router.post("/", [validarArchivoSubir], cargarArchivo);

// Ruta para actualizar la imagen de un elemento en una colección específica por su id
router.put("/:coleccion/:id", [
    validarArchivoSubir,
    check("id", "El id debe de ser de mongo").isMongoId(),
    check("coleccion").custom(c => coleccionesPermitidas(c, ["usuarios", "productos"])),
    validarCampos
], actualizarImagen);

// Ruta para mostrar la imagen de un elemento en una colección específica por su id
router.get("/:coleccion/:id", [
    check("id", "El id debe de ser de mongo").isMongoId(),
    check("coleccion").custom(c => coleccionesPermitidas(c, ["usuarios", "productos"])),
    validarCampos
], mostrarImagen);

module.exports = router;