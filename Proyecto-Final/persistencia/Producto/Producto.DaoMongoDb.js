import mongoose from "mongoose";
import ProductoModel from "../models/ProductoModelo.js";
import * as dotenv from "dotenv";
dotenv.config();

export default class Producto {
    constructor() {
        this.url = `mongodb+srv://coder1:${process.env.PASSWORDATLAS}@cluster0.lubyki3.mongodb.net/?retryWrites=true&w=majority`;
        this.mongodb = mongoose.connect;
    }
    async listar(id) {
        try {
            await this.mongodb(this.url);
            let producto = await ProductoModel.findById(id);
            if (producto) {
                return producto;
            } else {
                return { error: "no existe un producto con ese id" };
            }
        } catch (e) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    async listarAll() {
        try {
            await this.mongodb(this.url);
            let todos = await ProductoModel.find();
            return todos.length
                ? todos
                : { error: "no hay productos cargados" };
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    async listarCategoria(categoria) {
        try {
            await this.mongodb(this.url);
            let todos = await ProductoModel.find({ categoria: categoria });
            return todos.length
                ? todos
                : {
                      error: "no hay productos cargados o no hay en esa catogoria",
                  };
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    async guardar(prod) {
        try {
            await this.mongodb(this.url);
            const nuevoProducto = new ProductoModel(prod);
            return await nuevoProducto.save();
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    async actualizar(prod, id) {
        try {
            await this.mongodb(this.url);
            let producto = await ProductoModel.findByIdAndUpdate(id, prod, {
                new: true,
            });
            if (producto) {
                return producto;
            } else {
                return {
                    error: "error no se encontro ese producto o parametro incorrecto",
                };
            }
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    async borrar(id) {
        try {
            await this.mongodb(this.url);
            let producto = await ProductoModel.findByIdAndDelete(id);
            if (producto) {
                return producto;
            } else {
                return {
                    error: "error no se encontro ese producto o parametro incorrecto",
                };
            }
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    async borrarTodo() {
        try {
            const todos = [];
            await this.mongodb(this.url);
            await ProductoModel.remove({});
            return todos;
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    static returnSingleton() {
        if (!this.instance) {
            this.instance = new Producto();
        }
        return this.instance;
    }
}
