import CarritoMongoDb from './Carritos/Carrito.DaoMongoDb.js'
import CarritoMemoria from './Carritos/Carrito.DaoMemoria.js'
import CarritoArchivo from './Carritos/Carrito.DaoArchivo.js'

const exportCarrito = (metodo) =>{
    if (metodo == "mongodb") {
        return new CarritoMongoDb()
    }
    if (metodo == "memoria") {
        return new CarritoMemoria()
    }
    if (metodo == "archivo") {
        return new CarritoArchivo()
    }
}

export default exportCarrito