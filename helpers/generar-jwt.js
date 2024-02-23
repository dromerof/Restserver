const jwt = require("jsonwebtoken");

// Función para generar un token JWT
const generarJWT = (uid = "") => {

    // Retornar una promesa para manejar el proceso asíncrono
    return new Promise((resolve, reject) => {

        // Payload del token con el uid del usuario
        const payload = { uid };

        // Generar el token con el payload y la clave privada
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: "4h" // Expira en 4 horas
        }, (err, token) => {
            if (err) {
                console.error(err);
                reject("No se pudo generar el token");
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
}