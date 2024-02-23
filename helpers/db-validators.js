const Role = require("../models/role");
const { Usuario, Categoria, Producto } = require("../models");

/**
 * Usuarios
 */

// Verificar si es un rol válido
const esRoleValido = async (rol = "") => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
    return true;
}

// Verificar si el correo existe
const emailExiste = async (correo = "") => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo} ya se encuentra registrado, por favor ingresa otro`);
    }
    return true;
}

// Verificar si el usuario existe
const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id: ${id} no existe`);
    }
    return true;
}

/**
 * Categorías
 */

// Verificar si la categoría existe
const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id: ${id} no existe`);
    }
    return true;
}

/**
 * Productos
 */

// Verificar si el producto existe
const existeProductoPorId = async (id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id: ${id} no existe`);
    }
    return true;
}

/**
 * Colecciones 
 */

// Validar colecciones permitidas
const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida, estas son las permitidas: ${colecciones}`);
    }
    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}