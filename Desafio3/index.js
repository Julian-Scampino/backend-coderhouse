const fs = require("fs")
const express = require('express')
const app = express()
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto`)
 })
 
 class Contenedor {    
    // El metodo de abajo me devuelve llaves vacias {} y si lo convierto a template strings me da [objet Promise]
    /* async getById(id){
        try{
            const todos = await this.getAll()
            if(todos.some((producto) => producto.id == id)){
                const productoFiltrado = todos.filter((producto) => producto.id == id)
                console.log(productoFiltrado)
                return productoFiltrado
            }
        }catch(error){
            console.log(error);
        }
    } */
    // Solo me fucionó de forma sincrónica
    getById(id){
        try{
            const todos = this.getAll()
            if(todos.some((producto) => producto.id == id)){
                const productoFiltrado = todos.filter((producto) => producto.id == id)
                console.log(productoFiltrado)
                return productoFiltrado
            }
        }catch(error){
            console.log(error);
        }
    } 
    // Solo me fucionó de forma sincrónica
    getAll(){
        try {     
        const contenido = fs.readFileSync("./productos.txt", "utf-8");
        return JSON.parse(contenido,null,2)
        } 
        catch (error) {
            console.log(error);
        }    
    }
    // El metodo de abajo me devuelve llaves vacias {} y si lo convierto a template strings me da [objet Promise]
    /* async getAll(){
        try{
            const todos = await fs.promises.readFile("./productos.txt", "utf-8")
            return JSON.parse(todos)
        }
        catch (error){
            console.log(error)
        }
    } */

}
const contenedor = new Contenedor ()

app.get("/", (req, resp)=>{
    resp.send(`Hola bienvenido`)
}) 
app.get("/productos", (req, resp)=>{
    resp.send(contenedor.getAll())
})
app.get("/productosRandom", (req, resp)=>{
    resp.send(contenedor.getById(Math.floor((Math.random() * (3-1) + 1) + 1)))
})

