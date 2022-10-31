import express from "express";
import * as dotenv from 'dotenv'
dotenv.config()
if(process.env.METODO == "mongodb"){
	import ("../DAOs/Productos/Producto.DaoMongoDb.js")
	.then(({default: Producto}) =>{
	producto = new Producto
	})
}else if(process.env.METODO == "archivo"){
	import ("../DAOs/Productos/Producto.DaoArchivo.js")
	.then(({default: Producto}) =>{
		producto = new Producto
	})
}else if(process.env.METODO == "memoria"){
	import ("../DAOs/Productos/Producto.DaoMemoria.js")
	.then(({default: Producto}) =>{
		producto = new Producto
	})
}
let producto

const router = express.Router();


function validarAdmin(req, res, next) {
	if (req.query.admin) {
		next();
	} else {
		res.send("Error usted no tiene acceso");
	}
}

router.post("/", validarAdmin,async (req, res) => {
	const productoCreado = await producto.guardar(req.body);
	res.send(productoCreado);
});

router.delete("/:id", validarAdmin, async (req, res) => {
	const productoBorrado = await producto.borrar(req.params.id);
	res.send(productoBorrado);
});

router.get("/", async (req, res) => {
	const listaProductos = await producto.listarAll();
	res.send(listaProductos);
});

router.get("/:id", async (req, res) => {
	const productoBuscado = await producto.listar(req.params.id);
	res.send(productoBuscado);
});
router.put("/:id", validarAdmin, async (req, res) => {
	const productoActualizado = await producto.actualizar(req.body, req.params.id);
	res.send(productoActualizado);
});

export default router;
