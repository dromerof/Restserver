const { OAuth2Client } = require('google-auth-library');

// Crear instancia del cliente de OAuth2
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Función para verificar un token de Google
const googleVerify = async (token = "") => {

    try {
        // Verificar la autenticidad del token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        // Obtener información del usuario desde el token verificado
        const { name, picture, email } = ticket.getPayload();

        // Devolver la información necesaria del usuario
        return {
            nombre: name,
            img: picture,
            correo: email
        };
    } catch (error) {
        // En caso de error, lanzar una excepción
        throw new Error("Error al verificar el token de Google");
    }
}

module.exports = {
    googleVerify
}