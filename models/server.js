const express = require('express');
const cors = require("cors");

const { dbConnection } = require('../database/config');
class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            auth: "/api/auth",
            buscar: "/api/buscar",
            categorias: "/api/categorias",
            productos: "/api/productos",
            usuarios: "/api/usuarios",
        }
        
        // Conectar a base de datos
        this.conectarDD();

        //Middlewares
        this.middlewares();
        
        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDD(){
        await dbConnection();
    }
    
    middlewares(){

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio  publico
        this.app.use( express.static("public") );

    }

    routes() {

        this.app.use(this.path.auth, require("../routes/auth"));
        this.app.use(this.path.buscar, require("../routes/buscar"));
        this.app.use(this.path.categorias, require("../routes/categorias"));
        this.app.use(this.path.productos, require("../routes/productos"));
        this.app.use(this.path.usuarios, require("../routes/usuarios"));

    }

    listen(){
        
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto", this.port);
        });
    }

}

module.exports = Server;