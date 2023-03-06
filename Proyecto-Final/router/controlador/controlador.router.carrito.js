import Carrito from "../../persistencia/Carrito/CarritoFactory.js";
import * as dotenv from "dotenv";
dotenv.config();

let carrito = new Carrito().returnDbConnection();

const postCarritoCreacion = async (req, res) => {
    const carritoCreado = await carrito.crearCarrito(req.user.email);
    res.send(carritoCreado);
};

const deleteProductoCarrito = async (req, res) => {
    const productoBorrado = await carrito.borrarProd(
        req.params.id,
        req.params.id_prod
    );
    res.send(productoBorrado);
};
const deleteCarritoID = async (req, res) => {
    const carritoBorrado = await carrito.borrarCarr(req.params.id);
    res.send(carritoBorrado);
};
const getTodosLosCarrito = async (req, res) => {
    const listaCarritos = await carrito.listarAll();
    res.send(listaCarritos);
};
const getProductosCarrito = async (req, res) => {
    const listaCarritos = await carrito.listarProdDeCarrito(req.params.id);
    res.send(listaCarritos);
};

const postProductoCarrito = async (req, res) => {
    const producto = await carrito.guardarProductoEnCarrito(
        req.params.idPrd,
        req.params.id
    );
    res.send(producto);
};
export {
    postCarritoCreacion,
    deleteProductoCarrito,
    deleteCarritoID,
    getTodosLosCarrito,
    getProductosCarrito,
    postProductoCarrito,
};
