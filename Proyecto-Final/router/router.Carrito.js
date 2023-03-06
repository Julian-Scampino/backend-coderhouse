import express from "express";
import { checkAuthentication } from "./middlware/middlware-autenticacion.js";
import * as dotenv from "dotenv";
dotenv.config();
import {
    postCarritoCreacion,
    deleteProductoCarrito,
    deleteCarritoID,
    getTodosLosCarrito,
    getProductosCarrito,
    postProductoCarrito,
} from "./controlador/controlador.router.carrito.js";

const routerCarrito = express.Router();

routerCarrito.post("/", checkAuthentication, postCarritoCreacion);

routerCarrito.delete(
    "/:id/productos/:id_prod",
    checkAuthentication,
    deleteProductoCarrito
);
routerCarrito.delete("/:id", checkAuthentication, deleteCarritoID);

routerCarrito.get("/", checkAuthentication, getTodosLosCarrito);
routerCarrito.get("/:id/productos", checkAuthentication, getProductosCarrito);

routerCarrito.post(
    "/:id/productos/:idPrd",
    checkAuthentication,
    postProductoCarrito
);
export default routerCarrito;
