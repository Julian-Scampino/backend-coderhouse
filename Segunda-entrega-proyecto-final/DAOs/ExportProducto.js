import ProductoMongoDb from './Productos/Producto.DaoMongoDb.js'
import ProductoMemoria from './Productos/Producto.DaoMemoria.js'
import ProductoArchivo from './Productos/Producto.DaoArchivo.js'

const exportProducto = (metodo) =>{
    if (metodo == "mongodb") {
        return new ProductoMongoDb()
    }
    if (metodo == "memoria") {
        return new ProductoMemoria()
    }
    if (metodo == "archivo") {
        return new ProductoArchivo()
    }
}

export default exportProducto