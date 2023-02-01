import UsuariosArchivo from "./UsuariosArchivo.js"
import UsuariosMongoDb from "./UsuariosMongoDb.js"

export default class MyConnectionFactory{
    returnDbConnection(){
        if(process.env.METHOD == "mongodb"){
            return UsuariosMongoDb.returnSingleton()
        }
        if(process.env.METHOD == "filesystem"){
            return UsuariosArchivo.returnSingleton()
        }
    }
}