import OrdenesMongoDb from "./Ordenes.DaoMongoDb.js";
import * as dotenv from "dotenv";
dotenv.config();

export default class MyConnectionFactory {
    returnDbConnection() {
        if (process.env.METHOD == "mongodb") {
            return OrdenesMongoDb.returnSingleton();
        }
    }
}
