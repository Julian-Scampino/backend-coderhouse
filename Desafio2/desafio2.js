const fs = require("fs")

const nuevo = {                                                                                                                                                    
    title: 'Calculadora',                                                                                                                              
    price: 234.56,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'                                                                                                                                                                                       
}
class Contenedor {
    async save(productos){
        try{
            await fs.promises.writeFile("./productos.txt", JSON.stringify(productos, null, 2),"utf-8")
        }
        catch (error){
            console.log(error)
        }
    }
    async saveNuevo(productoNuevo) {
        try {
            const todos = await this.getAll();
            console.log("Abajo aparecera un log de todos");
            console.log(todos);
            if (todos.length <= 0 || todos == undefined) {
                productoNuevo.id = 1;
            }else if (todos.some((producto) => producto.title !== productoNuevo.title)) {
                const id = todos.sort((a, b) => b.id - a.id)[0].id;
                console.log(`Hola el id controlando duplicados es ${id}`);
                productoNuevo.id = id + 1;
            }
            todos.push(productoNuevo);
            this.save(todos);
            return productoNuevo.id;
        } 
        catch (error) {
          console.log(error);
        }
    }
    async getById(id){
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
    }
    async getAll(){
        try{
            const todos = await fs.promises.readFile("./productos.txt", "utf-8")
            console.log(todos);
            if(todos.length >= 0 || todos !== undefined){
                return JSON.parse(todos)
            }
        }
        catch (error){
            console.log(error)
        }
    }
    async deleteById(id){
        try{
            const todos = await this.getAll()
            if(todos.some((producto) => producto.id == id)){
                const productosFiltrados = todos.filter((producto) => producto.id != id)
                this.save(productosFiltrados)
            }
        }catch(error){
            console.log(error);
        }
    }
    async deleteAll(){
        try{
            this.save([])
        }catch(error){
            console.log(error);
        }
    }
}
const contenedor = new Contenedor ()
contenedor.saveNuevo(nuevo)
//contenedor.getById()
//contenedor.getAll()
//contenedor.deleteById()
//contenedor.deleteAll()