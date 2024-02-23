const { response } = require("express");
const { Categoria } = require("../models");

// Crear categoría
const crearCategoria = async (req, res = response) => {
    try {
        const nombre = req.body.nombre.toUpperCase();

        const categoriaDB = await Categoria.findOne({ nombre });

        if (categoriaDB) {
            return res.status(400).json({
                msg: `La categoría ${categoriaDB.nombre}, ya existe`
            });
        }

        // Generar la data a guardar
        const data = {
            nombre,
            usuario: req.usuario._id
        };

        const categoria = new Categoria(data);

        // Guardar en la base de datos
        await categoria.save();

        res.status(201).json(categoria);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al crear la categoría" });
    }
};

// Obtener categorías - paginado - total - populate
const obtenerCategorias = async (req, res = response) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                .populate("usuario", "nombre")
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.json({
            total,
            categorias
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener las categorías" });
    }
};

// Obtener categoría por ID - populate
const obtenerCategoria = async (req, res = response) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findById(id).populate("usuario", "nombre");

        res.json(categoria);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener la categoría por ID" });
    }
};

// Actualizar categoría
const actualizarCategoria = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { estado, usuario, ...data } = req.body;

        data.nombre = data.nombre.toUpperCase();
        data.usuario = req.usuario._id;

        const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

        res.json(categoria);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al actualizar la categoría" });
    }
};

// Eliminar categoría - estado: false
const eliminarCategoria = async (req, res = response) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findOneAndUpdate({ _id: id }, { estado: false }, { new: true });

        res.json(categoria);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al eliminar la categoría" });
    }
};

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    eliminarCategoria
};