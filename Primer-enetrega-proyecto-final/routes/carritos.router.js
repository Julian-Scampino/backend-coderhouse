import express from "express";
import Carrito from "../clases/Carrito.class.js";

const router = express.Router();

const carrito = new Carrito();

router.post("/", async (req, res) => {
	const carritoCreado = await carrito.crearCarrito();
	res.send(carritoCreado);
});

router.delete("/:id/productos/:id_prod", async (req, res) => {
	const productoBorrado = await carrito.borrarProd(req.params.id, req.params.id_prod);
	res.send(productoBorrado);
});
router.delete("/:id", async (req, res) => {
	const productoBorrado = await carrito.borrarCarr(req.params.id);
	res.send(productoBorrado);
});

router.get("/:id/productos", async (req, res) => {
	const listaCarritos = await carrito.listarProdDeCarrito(req.params.id);
	res.send(listaCarritos);
});

router.post("/:id/productos/:idPrd", async (req, res) => {
	const respuesta = await carrito.guardarProductoEnCarrito(
		req.params.idPrd,
		req.params.id
	);
	res.send(respuesta);
});
export default router;
