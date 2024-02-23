const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares");

const { login, googleSignIn } = require("../controllers");

const router = Router();

// Ruta para realizar el inicio de sesión
router.post('/login', [
    check("correo", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos
], login);

// Ruta para realizar el inicio de sesión con Google
router.post('/google', [
    check("id_token", "id_token de Google es necesario").not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;