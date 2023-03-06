import mongoose from "mongoose";
import UserModels from "../models/userModels.js";
import bCrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();

export default class UsuariosMongoDb {
    constructor() {
        this.url = `mongodb+srv://coder1:${process.env.PASSWORDATLAS}@cluster0.lubyki3.mongodb.net/?retryWrites=true&w=majority`;
        this.mongodbConnect = mongoose.connect(this.url);
    }
    createHash(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
    isValidPassword(user, password) {
        return bCrypt.compareSync(password, user.password);
    }
    async buscarUsuarioID(id) {
        try {
            await this.mongodbConnect;
            return await UserModels.findById(id);
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    async buscarUsuarioUsername(username) {
        try {
            await this.mongodbConnect;
            return await UserModels.findOne({ username: username });
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    async buscarUsuarioEmail(email) {
        try {
            await this.mongodbConnect;
            return await UserModels.findOne({ email: email });
        } catch (err) {
            return { error: "error de conexion o parametro incorrecto" };
        }
    }
    async registrarUsuario(req, email, password, done) {
        let passwordEncriptado = this.createHash(password);
        try {
            await this.mongodbConnect;
            UserModels.findOne({ email: email }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    return done(null, false);
                }
                UserModels.create(
                    {
                        username: req.body.username,
                        password: passwordEncriptado,
                        email: email,
                    },
                    (err, userWithId) => {
                        if (err) {
                            return done(err, null);
                        }
                        return done(null, userWithId);
                    }
                );
            });
        } catch (e) {
            return done(e, null);
        }
    }
    async loginUsuario(email, password, done) {
        try {
            await this.mongodbConnect;
            UserModels.findOne({ email: email }, (err, user) => {
                if (err) {
                    return done(err, null);
                }
                if (!user) {
                    return done(null, false);
                }
                if (!this.isValidPassword(user, password)) {
                    return done(null, false);
                }
                return done(null, user);
            });
        } catch (e) {
            return done(e, null);
        }
    }
    static returnSingleton() {
        if (!this.instance) {
            this.instance = new UsuariosMongoDb();
        }
        return this.instance;
    }
}
