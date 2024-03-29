import express from "express";
import Producto from "../persistencia/ProductosFactory.js"
import * as dotenv from 'dotenv'
dotenv.config()

let producto = (new Producto).returnDbConnection()

const routerProductos = express.Router();


function validarAdmin(req, res, next) {
	if (req.query.admin) {
		next();
	} else {
		res.send("Error usted no tiene acceso");
	}
}

routerProductos.post("/", validarAdmin,async (req, res) => {
	const productoCreado = await producto.guardar(req.body);
	res.send(productoCreado);
});

routerProductos.delete("/:id", validarAdmin, async (req, res) => {
	const productoBorrado = await producto.borrar(req.params.id);
	res.send(productoBorrado);
});
routerProductos.delete("/", validarAdmin, async (req, res) => {
	const productosBorrados = await producto.borrarTodo();
	res.send(productosBorrados)
});

routerProductos.get("/", async (req, res) => {
	const listaProductos = await producto.listarAll();
	res.send(listaProductos);
});

routerProductos.get("/:id", async (req, res) => {
	const productoBuscado = await producto.listar(req.params.id);
	res.send(productoBuscado);
});
routerProductos.put("/:id", validarAdmin, async (req, res) => {
	const productoActualizado = await producto.actualizar(req.body, req.params.id);
	res.send(productoActualizado);
});

export default routerProductos;
