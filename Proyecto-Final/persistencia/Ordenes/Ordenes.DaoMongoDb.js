import mongoose from "mongoose";
import OrdenesModel from "../models/OrdenesModelo.js";

export default class Ordenes {
    constructor() {
        this.url = `mongodb+srv://coder1:${process.env.PASSWORDATLAS}@cluster0.lubyki3.mongodb.net/?retryWrites=true&w=majority`;
        this.mongodb = mongoose.connect;
    }
    async listarAll() {
        try {
            await this.mongodb(this.url);
            let ordenes = await OrdenesModel.find();
            return ordenes.length > 0
                ? ordenes
                : { error: "no hay ordenes cargados" };
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    async crearOrdenes(orden) {
        try {
            await this.mongodb(this.url);
            let todos = await OrdenesModel.find();
            if (todos.length > 0) {
                const numero = todos.sort((a, b) => b.numero - a.numero)[0]
                    .numero;
                orden.numero = numero + 1;
            } else {
                orden.numero = 1;
            }
            let nuevaOrden = new OrdenesModel(orden);
            await nuevaOrden.save();
            return nuevaOrden;
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }

    static returnSingleton() {
        if (!this.instance) {
            this.instance = new Ordenes();
        }
        return this.instance;
    }
}
