const { Schema, model } = require("mongoose");

// Modelo de Role
const RoleSchema = Schema({
    // Nombre del rol
    rol: {
        type: String,
        required: [true, "El rol es obligatorio"]
    }
});

module.exports = model("Role", RoleSchema);