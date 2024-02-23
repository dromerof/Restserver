const express = require('express');
const cors = require("cors");
const fileUpload = require("express-fileupload");

const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        // Definir las rutas de la aplicación
        this.path = {
            auth: "/api/auth",
            buscar: "/api/buscar",
            categorias: "/api/categorias",
            productos: "/api/productos",
            usuarios: "/api/usuarios",
            uploads: "/api/uploads",
        };

        // Conectar a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    // Configurar los middlewares de la aplicación
    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static("public"));

        // Fileupload - Carga de archivos
        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: '/tmp/',
                createParentPath: true,
            })
        );
    }

    // Configurar las rutas de la aplicación
    routes() {
        this.app.use(this.path.auth, require("../routes/auth"));
        this.app.use(this.path.buscar, require("../routes/buscar"));
        this.app.use(this.path.categorias, require("../routes/categorias"));
        this.app.use(this.path.productos, require("../routes/productos"));
        this.app.use(this.path.usuarios, require("../routes/usuarios"));
        this.app.use(this.path.uploads, require("../routes/uploads"));
    }

    // Iniciar el servidor y escuchar en el puerto especificado
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto", this.port);
        });
    }
}

module.exports = Server;