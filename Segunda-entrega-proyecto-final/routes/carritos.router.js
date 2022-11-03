import express from "express";
import Carrito from "../DAOs/ExportCarrito.js"
import * as dotenv from 'dotenv'
dotenv.config()

let carrito = Carrito(process.env.METODO)

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
