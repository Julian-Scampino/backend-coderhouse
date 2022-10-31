import express from "express";
import * as dotenv from 'dotenv'
dotenv.config()
if(process.env.METODO == "mongodb"){
	import ("../DAOs/Carritos/Carrito.DaoMongodb.js")
	.then(({default: Carrito}) =>{
	carrito = new Carrito
	})
}else if(process.env.METODO == "archivo"){
	import ("../DAOs/Carritos/Carrito.DaoArchivo.js")
	.then(({default: Carrito}) =>{
		carrito = new Carrito
	})
}else if(process.env.METODO == "memoria"){
	import ("../DAOs/Carritos/Carrito.DaoMemoria.js")
	.then(({default: Carrito}) =>{
		carrito = new Carrito
	})
}
let carrito

const router = express.Router();

router.post("/", async (req, res) => {
	const carritoCreado = await carrito.crearCarrito(req.body);
	res.send(carritoCreado);
});

router.delete("/:id/productos/:id_prod", async (req, res) => {
	const productoBorrado = await carrito.borrarProd(req.params.id, req.params.id_prod);
	res.send(productoBorrado);
});
router.delete("/:id", async (req, res) => {
	const carritoBorrado = await carrito.borrarCarr(req.params.id);
	res.send(carritoBorrado);
});

router.get("/:id/productos", async (req, res) => {
	const listaCarritos = await carrito.listarProdDeCarrito(req.params.id);
	res.send(listaCarritos);
});

router.post("/:id/productos/:idPrd", async (req, res) => {
	const producto = await carrito.guardarProductoEnCarrito(
		req.params.idPrd,
		req.params.id
	);
	res.send(producto);
});
export default router;
