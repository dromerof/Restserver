const { Schema, model } = require("mongoose");

// Definición del esquema para el modelo Producto
const ProductoSchema = Schema({
    // Nombre del producto
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true
    },
    // Estado del producto (activo o inactivo)
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    // ID del usuario que creó el producto
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    // Precio del producto
    precio: {
        type: Number,
        default: 0,
    },
    // ID de la categoría a la que pertenece el producto
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: true
    },
    // Descripción del producto
    descripcion: {
        type: String
    },
    // Disponibilidad del producto (disponible o no disponible)
    disponible: {
        type: Boolean,
        default: true
    },
    // URL de la imagen del producto
    img: {
        type: String
    }
});

// Método toJSON para excluir campos en la respuesta JSON
ProductoSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model("Producto", ProductoSchema);