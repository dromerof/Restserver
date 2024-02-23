const { response } = require("express");

// Middleware para verificar si el usuario tiene rol de administrador
const esAdminRol = (req, res = response, next) => {
    // Verificar si el token ha sido validado previamente
    if (!req.usuario) {
        return res.status(500).json({
            msg: "Se quiere verificar el rol sin validar el token primero"
        });
    }

    // Obtener rol y nombre del usuario desde el token
    const { rol, nombre } = req.usuario;

    // Verificar si el rol es de administrador
    if (rol !== "ADMIN_ROL") {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        });
    }

    next();
};

// Middleware para verificar si el usuario tiene alguno de los roles especificados
const tieneRol = (...roles) => {
    return (req, res = response, next) => {
        // Verificar si el token ha sido validado previamente
        if (!req.usuario) {
            return res.status(500).json({
                msg: "Se quiere verificar el rol sin validar el token primero"
            });
        }

        // Verificar si el usuario tiene al menos uno de los roles especificados
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles.join(", ")}`
            });
        }

        next();
    };
};

module.exports = {
    esAdminRol,
    tieneRol
};