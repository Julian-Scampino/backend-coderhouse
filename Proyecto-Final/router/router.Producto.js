import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { checkAuthentication } from "./middlware/middlware-autenticacion.js";
import {
    postUNProducto,
    deleteIDProductos,
    deleteTodosProductos,
    getTodosProductos,
    getIDProductos,
    putIDProductos,
    getCategoriaProductos,
} from "./controlador/controlador.router.productos.js";

const routerProductos = express.Router();

routerProductos.post("/", checkAuthentication, postUNProducto);

routerProductos.delete("/:id", checkAuthentication, deleteIDProductos);
routerProductos.delete("/", checkAuthentication, deleteTodosProductos);

routerProductos.get("/", checkAuthentication, getTodosProductos);

routerProductos.get("/:id", checkAuthentication, getIDProductos);
routerProductos.put("/:id", checkAuthentication, putIDProductos);
routerProductos.get(
    "/categorias/:categoria",
    checkAuthentication,
    getCategoriaProductos
);
export default routerProductos;
