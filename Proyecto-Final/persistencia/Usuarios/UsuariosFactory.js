import UsuariosMongoDb from "./UsuariosMongoDb.js";
import * as dotenv from "dotenv";
dotenv.config();

export default class MyConnectionFactory {
    returnDbConnection() {
        if (process.env.METHOD == "mongodb") {
            return UsuariosMongoDb.returnSingleton();
        }
    }
}
