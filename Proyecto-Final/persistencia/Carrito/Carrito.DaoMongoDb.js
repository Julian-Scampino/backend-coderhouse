import mongoose from "mongoose";
import CarritoModel from "../models/CarritoModelo.js";
import ProductoModel from "../models/ProductoModelo.js";

export default class Carrito {
    constructor() {
        this.url = `mongodb+srv://coder1:${process.env.PASSWORDATLAS}@cluster0.lubyki3.mongodb.net/?retryWrites=true&w=majority`;
        this.mongodb = mongoose.connect;
    }
    async listar(id) {
        try {
            await this.mongodb(this.url);
            let carrito = await CarritoModel.findById(id);
            if (carrito) {
                return carrito;
            } else {
                return { error: "no hay carrito cargados" };
            }
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    async listarProdDeCarrito(id) {
        try {
            await this.mongodb(this.url);
            let carrito = await CarritoModel.findById(id);
            if (carrito.productos?.length > 0) {
                return carrito.productos;
            } else {
                return { error: "no hay productos en el carrito" };
            }
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    async listarAll() {
        try {
            await this.mongodb(this.url);
            let carritos = await CarritoModel.find();
            return carritos.length > 0
                ? carritos
                : { error: "no hay carritos cargados" };
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    async listarEmail(email) {
        try {
            await this.mongodb(this.url);
            let carritoUsuario = await CarritoModel.findOne({ email: email });
            if (carritoUsuario) {
                return carritoUsuario;
            } else {
                return {
                    error: "no hay carritos con ese email de usuario de TOKEN",
                };
            }
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    async crearCarrito(email) {
        try {
            await this.mongodb(this.url);
            let carritoUsuario = await CarritoModel.findOne({ email: email });
            if (carritoUsuario) {
                return { errr: "ya existe un carrito creado con tu email" };
            } else {
                let carrito = new CarritoModel({ email: email });
                await carrito.save();
                return carrito;
            }
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    async guardarProductoEnCarrito(idProd, idCarrito) {
        try {
            await this.mongodb(this.url);
            let producto = await ProductoModel.findById(idProd);
            if (!producto) {
                return {
                    error: "error no existe un producto con ese ID o parametro incorrecto",
                };
            }
            let carrito = await CarritoModel.findById(idCarrito);
            if (carrito.productos.some((element) => element._id == idProd)) {
                return { error: "ya existe ese producto en el carrito" };
            }
            carrito.productos <= 0
                ? (carrito.productos = [producto])
                : (carrito.productos = [...carrito.productos, producto]);
            return await carrito.save();
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    async borrarProd(id, id_prod) {
        try {
            await this.mongodb(this.url);
            let producto = await ProductoModel.findById(id_prod);
            if (!producto) {
                return {
                    error: "error no existe un producto con ese ID o parametro incorrecto",
                };
            }
            let carrito = await CarritoModel.findById(id);
            let index = carrito.productos.findIndex(
                (prod) => prod._id == id_prod
            );
            carrito.productos.splice(index, 1);
            await CarritoModel.findByIdAndUpdate(id, carrito);
            return producto;
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    async borrarCarr(id) {
        try {
            await this.mongodb(this.url);
            return await CarritoModel.findByIdAndDelete(id);
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    static returnSingleton() {
        if (!this.instance) {
            this.instance = new Carrito();
        }
        return this.instance;
    }
}
