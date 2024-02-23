const { Router } = require("express");
const { check } = require("express-validator");

// Importar middlewares personalizados
const {
  validarCampos,
  validarJWT,
  tieneRol,
  esAdminRol,
} = require("../middlewares");

// Importar funciones de validación de la base de datos
const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers");

// Importar controladores de usuarios
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers");

const router = Router();

// Obtener todos los usuarios - público
router.get('/', usuariosGet);

// Actualizar usuario por ID - privado - Admin o mismo usuario
router.put('/:id', [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
    validarCampos
], usuariosPut);

// Crear usuario - privado - cualquier persona con un token válido
router.post('/', [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe de ser más de 6 letras").isLength({min: 6}),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").custom(esRoleValido),
    validarCampos
], usuariosPost);

// Borrar usuario por ID - privado - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    tieneRol("ADMIN_ROL", "USER_ROL", "OTRO_ROL"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

// Actualizar información básica del usuario - privado - cualquier persona con un token válido
router.patch('/', usuariosPatch);

module.exports = router;