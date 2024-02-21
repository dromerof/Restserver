const { response } = require("express");
const { Producto } = require("../models");

// Crear Producto
const crearProducto = async (req, res = response) => {

    const {estado, usuario, ...body} = req.body;

    const productoDB = await Producto.findOne({nombre: body.categoria});

    if (productoDB) {
        return res.status(400).json({
            msg: `El prodcuto ${productoDB.nombre}, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }
    
    const producto = new Producto(data);

    // Guardar DB
    await producto.save();

    res.status(201).json(producto);

} 

// Obtener Productos - paginado - total - populate
const obtenerProductos = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
    
        const [ total, productos ] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .populate("usuario", "nombre")
                .populate("categoria", "nombre")
                .skip(Number(desde))
                .limit(Number(limite))
        ]);
    
        res.json({
            total,
            productos 
        });
}

// Obtener Producto por ID - populate
const obtenerProducto = async (req, res = response) => {

    const {id} = req.params;
    const producto = await Producto.findById(id)
                            .populate("usuario", "nombre")
                            .populate("categoria", "nombre");
    
    res.json(producto);
}

// Actualizar Producto
const actualizarProducto = async (req, res = response) => {

    const {id} = req.params;
    const {estado, usuario,  ...data} = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();    
    }
    
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate({_id: id}, data, {new: true})
    
    res.json(producto);
}

// Eliminar Prodcuto - estado: false
const eliminarProducto = async (req, res = response) => {
    
    const {id} = req.params;
    const producto = await Producto.findOneAndUpdate({_id: id}, {estado: false}, {new: true});
    
    res.json(producto);
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto,
}