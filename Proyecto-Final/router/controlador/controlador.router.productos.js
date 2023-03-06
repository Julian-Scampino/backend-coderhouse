import Producto from "../../persistencia/Producto/ProductosFactory.js";
import * as dotenv from "dotenv";
dotenv.config();

let producto = new Producto().returnDbConnection();

const postUNProducto = async (req, res) => {
    const productoCreado = await producto.guardar(req.body);
    res.send(productoCreado);
};

const deleteIDProductos = async (req, res) => {
    const productoBorrado = await producto.borrar(req.params.id);
    res.send(productoBorrado);
};
const deleteTodosProductos = async (req, res) => {
    const productosBorrados = await producto.borrarTodo();
    res.send(productosBorrados);
};

const getTodosProductos = async (req, res) => {
    const listaProductos = await producto.listarAll();
    res.send(listaProductos);
};

const getIDProductos = async (req, res) => {
    const productoBuscado = await producto.listar(req.params.id);
    res.send(productoBuscado);
};
const putIDProductos = async (req, res) => {
    const productoActualizado = await producto.actualizar(
        req.body,
        req.params.id
    );
    res.send(productoActualizado);
};
const getCategoriaProductos = async (req, res) => {
    const listarCategoria = await producto.listarCategoria(
        req.params.categoria
    );
    res.send(listarCategoria);
};
export {
    postUNProducto,
    deleteIDProductos,
    deleteTodosProductos,
    getTodosProductos,
    getIDProductos,
    putIDProductos,
    getCategoriaProductos,
};
