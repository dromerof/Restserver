const { Schema, model } = require("mongoose");

// Definición del esquema para el usuario
const UsuarioSchema = Schema({
    // Nombre del usuario
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    // Correo del usuario
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true,
    },
    // Contraseña del usuario
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
    },
    // Imagen del usuario
    img: {
        type: String,
    },
    // Rol del usuario (ADMIN_ROLE, USER_ROLE, etc.)
    rol: {
        type: String,
        required: true,
        default: "USER_ROLE",
        enum: ["ADMIN_ROLE", "USER_ROLE"], // Valores permitidos
    },
    // Estado del usuario (activo o inactivo)
    estado: {
        type: Boolean,
        default: true,
    },
    // Indica si el usuario se registró con Google
    google: {
        type: Boolean,
        default: false,
    },
});

// Método para transformar el objeto de usuario a formato JSON
UsuarioSchema.methods.toJSON = function () {
    // Extraer propiedades innecesarias antes de enviar el objeto JSON
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

module.exports = model("Usuario", UsuarioSchema);