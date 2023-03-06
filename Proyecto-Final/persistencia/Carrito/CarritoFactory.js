import CarritoMongoDb from "./Carrito.DaoMongoDb.js";
import * as dotenv from "dotenv";
dotenv.config();

export default class MyConnectionFactory {
    returnDbConnection() {
        if (process.env.METHOD == "mongodb") {
            return CarritoMongoDb.returnSingleton();
        }
    }
}
