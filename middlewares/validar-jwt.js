const { response, request, json } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

// Middleware para validar el token JWT en las peticiones
const validarJWT = async (req = request, res = response, next) => {
    // Obtener el token desde los headers de la petición
    const token = req.header("x-token");

    // Verificar si hay token en la petición
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        });
    }

    try {
        // Verificar y obtener el uid desde el token
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Buscar el usuario en la base de datos por el uid
        const usuario = await Usuario.findById(uid);

        // Verificar si el usuario existe en la base de datos
        if (!usuario) {
            return res.status(401).json({
                msg: "Token no válido - usuario no existente en la base de datos"
            });
        }

        // Verificar si el usuario tiene estado activo
        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Token no válido - usuario con estado: false"
            });
        }

        // Asignar el usuario al objeto req para que esté disponible en las rutas
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token no válido"
        });
    }
};

module.exports = {
    validarJWT
};
