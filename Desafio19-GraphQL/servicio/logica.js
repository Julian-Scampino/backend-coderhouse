import {leerCarrito, escribirCarrito} from '../persistencia/archivoCarrito.js'

const lecturaCarrito = async () => {
    console.log("se ejecuto la funcion lecturaCarrito() de logica.js")
    return await leerCarrito()
}
const escrituraCarrito = async (data) =>{
    return await escribirCarrito(data)
}
export {lecturaCarrito, escrituraCarrito}