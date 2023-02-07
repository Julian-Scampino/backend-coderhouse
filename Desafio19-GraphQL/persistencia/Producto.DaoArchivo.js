import fs from "fs"
export default class Producto {
	static productos = [];
	constructor() {
		this.id = 0 ;
	}
	async listar({id}) {
		try{
			const todos = await this.listarAll();
			if(todos.length > 0){
				let producto = todos.find((prod) => prod.id == id);
				if(producto == undefined){
					return {error: "no existe un producto con ese id"}
				}
				return producto
			}else{
				return { error: "no hay productos cargados" }	
			}
        }
        catch (error){
            console.log(error)
        }
	}
	async listarAll() {
		try{
			const todos = await fs.promises.readFile("./persistencia/productos.txt","utf-8")
			return todos.length
			? JSON.parse(todos,null,2)
			: [];
        }
        catch (error){
            console.log(error)
        }
	}

	async guardar({datos: {titulo, precio}}) {
		// El parametro datos solo me trae { datos: [Object: null prototype] { titulo: 'cosa1', precio: 123 } }
		// Con el codigo de JSON.parse(JSON.stringify(datos)) me trae { datos: { titulo: 'cosa1', precio: 123 } }
		//Y luego asignarlo a una variable y hacer VARIBALE.datos.titulo
		//let probando = JSON.parse(JSON.stringify(datos))
		//-----------O desestructurar datos y luego desestructurar...
		//y luego  let {titulo} = datos
		//------ O desestructuracion de anidados {datos: {titulo, precio}}
		// y luego let prod = {titulo, precio}
		let prod = {titulo, precio}
		console.log("log de guardar en archivo con graphql", prod);
		try{
			const todos = await this.listarAll();
            if (todos.length <= 0 || todos == undefined) {
                prod.id = 1;
            }else if (!(todos.some((producto) => producto.id == prod.id))) {
                const id = todos.sort((a, b) => b.id - a.id)[0].id;
                prod.id = id + 1;
            }
			prod.timeStamp = Date.now()
			todos.push(prod)
			await fs.promises.writeFile("./persistencia/productos.txt", JSON.stringify(todos, null, 2),"utf-8")
            return prod;
        }
        catch (error){
            console.log(error)
        }
	}
	async actualizar(todo) {
		let {id} = todo
		let {titulo, precio} = todo.datos
		let prod = {titulo, precio}
		try{
			const todos = await this.listarAll()
			if(todos.length > 0){
				prod.id = Number(id);
				prod.timeStamp = Date.now()
				let index = todos.findIndex((prod) => prod.id == id);
				if(index == -1){
					return {error: "no existe un producto con ese id"}
				}
				todos.splice(index, 1, prod);
				await fs.promises.writeFile("./persistencia/productos.txt", JSON.stringify(todos, null, 2),"utf-8")
				return prod
			}else{
				return { error: "no hay productos cargados para actualizar" }	
			}
        }
        catch (error){
            console.log(error)
        }
	}
	async borrar({id}) {
		try{
			const todos = await this.listarAll()
			if(todos.length > 0){
				let index = todos.findIndex((prod) => prod.id == id);
				if(index == -1){
					return {error: "no existe un producto con ese id"}
				}
				// ADVERTENCIA el metodo splice retorna un array con el o los obejetos borrados
				let productoBorrado = todos.splice(index, 1)
				await fs.promises.writeFile("./persistencia/productos.txt", JSON.stringify(todos, null, 2),"utf-8")
				return productoBorrado[0];
			}else{
				return { error: "no hay productos cargados" }	
			}
        }
        catch (error){
            console.log(error)
        }
	}
	async borrarTodo() {
		try{
			const todos = []
			await fs.promises.writeFile("./persistencia/productos.txt", JSON.stringify(todos, null, 2),"utf-8")
			return todos
        }
        catch (error){
            console.log(error)
        }
	}
	static returnSingleton(){
        if(!this.instance){
            this.instance = new Producto()
        }
        return this.instance
    }
}
