import mongoose from "mongoose";
import ChatModelo from "../models/ChatModelo.js";
import * as dotenv from "dotenv";
dotenv.config();

export default class ChatDaoMongoDb {
    constructor() {
        this.url = `mongodb+srv://coder1:${process.env.PASSWORDATLAS}@cluster0.lubyki3.mongodb.net/?retryWrites=true&w=majority`;
        this.mongodb = mongoose.connect;
    }
    async listarEmail(email) {
        try {
            await this.mongodb(this.url);
            let chat = await ChatModelo.find({ email: email });
            if (chat.length > 0) {
                return chat;
            } else {
                return { error: "no existe un chat con ese email" };
            }
        } catch (e) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    async listarAll() {
        try {
            await this.mongodb(this.url);
            let todos = await ChatModelo.find();
            return todos.length ? todos : { error: "no hay chats cargados" };
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }

    async guardar(chat) {
        try {
            await this.mongodb(this.url);
            const nuevochat = new ChatModelo(chat);
            return await nuevochat.save();
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }

    static returnSingleton() {
        if (!this.instance) {
            this.instance = new ChatDaoMongoDb();
        }
        return this.instance;
    }
}
