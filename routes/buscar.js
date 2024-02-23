const { Router } = require ("express");
const { buscar } = require("../controllers");

const router = Router();

// Ruta para realizar una búsqueda en una colección específica con un término dado
router.get("/:coleccion/:termino", buscar)


module.exports = router;