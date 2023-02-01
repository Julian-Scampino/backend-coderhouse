import ProductoDaoArchivo from './Producto.DaoArchivo.js'
import ProductoDaeoMongoDb from './Producto.DaoMongoDb.js'
export default class MyConnectionFactory{
    returnDbConnection(){
        if(process.env.METHOD == "mongodb"){
            return ProductoDaeoMongoDb.returnSingleton()
        }
        if(process.env.METHOD == "filesystem"){
            return ProductoDaoArchivo.returnSingleton()
        }
    }
}