const { Schema, model } = require("mongoose");

// Definición del esquema para la categoría
const CategoriaSchema = Schema({
    // Nombre de la categoría
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true
    },
    // Estado de la categoría (activa o inactiva)
    estado: {
        type: Boolean,
        default: true, // Por defecto, una categoría está activa
        required: true
    },
    // Usuario asociado a la categoría
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario", // Referencia al modelo de Usuario
        required: true
    }
});

// Método para transformar el objeto de categoría a formato JSON
CategoriaSchema.methods.toJSON = function () {
    // Extraer propiedades innecesarias antes de enviar el objeto JSON
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model("Categoria", CategoriaSchema);