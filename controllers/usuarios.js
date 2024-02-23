const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

// Crear un nuevo usuario
const usuariosPost = async (req, res = response) => {
    try {
        const { nombre, correo, password, rol } = req.body;
        const usuario = new Usuario({ nombre, correo, password, rol });

        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        // Guardar en DB
        await usuario.save();

        res.json({
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al crear el usuario"
        });
    }
};

// Obtener lista de usuarios paginada
const usuariosGet = async (req = request, res = response) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, usuarios] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.json({
            total,
            usuarios
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al obtener la lista de usuarios"
        });
    }
};

// Actualizar un usuario por ID
const usuariosPut = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, password, google, correo, ...resto } = req.body;

        if (password) {
            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password, salt);
        }

        const usuario = await Usuario.findByIdAndUpdate(id, resto);

        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al actualizar el usuario"
        });
    }
};

// Método patch - No implementado
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "patch API - controlador"
    });
};

// Eliminar un usuario por ID
const usuariosDelete = async (req, res = response) => {
    try {
        const { id } = req.params;

        // Físicamente lo borramos
        // const usuario = await Usuario.findByIdAndDelete(id);

        const usuario = await Usuario.findOneAndUpdate(id, { estado: false });
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al eliminar el usuario"
        });
    }
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
};