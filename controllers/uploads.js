const path = require("path");
const fs = require("fs");

const { response } = require("express");
const { subirArchivo } = require("../helpers");

const { Usuario, Producto } = require("../models");

// Cargar archivo en servidor
const cargarArchivo = async (req, res = response) => {
    try {
        const nombre = await subirArchivo(req.files, undefined, "img");
        res.json({ nombre });
    } catch (msg) {
        res.status(400).json({ msg });
    }
};

// Actualizar imagen de usuario o producto
const actualizarImagen = async (req, res = response) => {
    const { coleccion, id } = req.params;
    let modelo;

    try {
        switch (coleccion) {
            case "usuarios":
                modelo = await Usuario.findById(id);
                if (!modelo) {
                    return res.status(400).json({
                        msg: `No existe un usuario con el id: ${id}`
                    });
                }
                break;

            case "productos":
                modelo = await Producto.findById(id);
                if (!modelo) {
                    return res.status(400).json({
                        msg: `No existe un producto con el id: ${id}`
                    });
                }
                break;

            default:
                return res.status(500).json({ msg: "Se me olvidó validar esto" });
        }

        // Limpiar imágenes previas
        if (modelo.img) {
            // Borrar la imagen del servidor
            const pathImagen = path.join(__dirname, "../uploads", coleccion, modelo.img);
            if (fs.existsSync(pathImagen)) {
                fs.unlinkSync(pathImagen);
            }
        }

        const nombre = await subirArchivo(req.files, undefined, coleccion);
        modelo.img = nombre;
        await modelo.save();

        res.json(modelo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al actualizar la imagen" });
    }
};

// Mostrar imagen de usuario o producto
const mostrarImagen = async (req, res = response) => {
    const { coleccion, id } = req.params;
    let modelo;

    try {
        switch (coleccion) {
            case "usuarios":
                modelo = await Usuario.findById(id);
                if (!modelo) {
                    return res.status(400).json({
                        msg: `No existe un usuario con el id: ${id}`
                    });
                }
                break;

            case "productos":
                modelo = await Producto.findById(id);
                if (!modelo) {
                    return res.status(400).json({
                        msg: `No existe un producto con el id: ${id}`
                    });
                }
                break;

            default:
                return res.status(500).json({ msg: "Se me olvidó validar esto" });
        }

        // Limpiar imágenes previas
        if (modelo.img) {
            // Enviar la imagen al cliente
            const pathImagen = path.join(__dirname, "../uploads", coleccion, modelo.img);
            if (fs.existsSync(pathImagen)) {
                return res.sendFile(pathImagen);
            }
        }

        // Si no hay imagen, enviar imagen por defecto
        const pathNoImage = path.join(__dirname, "../assets/no-image.jpg");
        res.sendFile(pathNoImage);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al mostrar la imagen" });
    }
};

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
};
