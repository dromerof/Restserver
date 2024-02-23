const { validationResult } = require("express-validator");

// Middleware para validar los campos definidos por express-validator
const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};

module.exports = {
    validarCampos,
};