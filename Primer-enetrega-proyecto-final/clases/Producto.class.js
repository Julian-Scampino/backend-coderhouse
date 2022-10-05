import fs from "fs"
export default class Producto {
	static productos = [];
	constructor() {
		this.id = 0 ;
	}

	/* listar(id) {
		let producto = Producto.productos.find((prod) => prod.id == id);
		return producto || { error: "producto no encontrado" };
	} */
	async listar(id) {
		try{
			/* const todos = await fs.promises.readFile("./persistencia/productos.txt","utf-8")
			const todosConvertido = JSON.parse(todos,null,2) */
			const todos = await this.listarAll();
			if(todos.length > 0){
				let producto = todos.find((prod) => prod.id == id);
				return producto
			}else{
				return { error: "no hay productos cargados" }	
			}
        }
        catch (error){
            console.log(error)
        }
	}

	/* listarAll() {
		return Producto.productos.length
			? Producto.productos
			: { error: "no hay productos cargados" };
	} */
	async listarAll() {
		try{
			const todos = await fs.promises.readFile("./persistencia/productos.txt","utf-8")
			return todos.length
			? JSON.parse(todos,null,2)
			: { error: "no hay productos cargados" };
        }
        catch (error){
            console.log(error)
        }
	}

	async guardar(prod) {
		try{
			/* prod.id = ++this.id;
			prod.timeStamp = Date.now();
			Producto.productos.push(prod);
			await fs.promises.writeFile("./persistencia/productos.txt", JSON.stringify(Producto.productos, null, 2),"utf-8")
			return prod */
			//Abajo la forma con comprobacion de id 
			const todos = await this.listarAll();
            if (todos.length <= 0 || todos == undefined) {
                prod.id = 1;
            }else if (!(todos.some((producto) => producto.id == prod.id))) {
                const id = todos.sort((a, b) => b.id - a.id)[0].id;
                prod.id = id + 1;
            }
			prod.timeStamp = Date.now()
			Producto.productos.push(prod)
			await fs.promises.writeFile("./persistencia/productos.txt", JSON.stringify(Producto.productos, null, 2),"utf-8")
            return prod;
        }
        catch (error){
            console.log(error)
        }
	}

	/* actualizar(prod, id) {
		prod.id = Number(id);
		let index = Producto.productos.findIndex((prod) => prod.id == id);
		Producto.productos.splice(index, 1, prod);
	} */
	async actualizar(prod, id) {
		try{
			const todos = await this.listarAll()
			console.log("productos traidos para actualizar", todos);
			if(todos.length > 0){
				prod.id = Number(id);
				prod.timeStamp = Date.now()
				let index = todos.findIndex((prod) => prod.id == id);
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

	/* borrar(id) {
		let index = Producto.productos.findIndex((prod) => prod.id == id);
		return Producto.productos.splice(index, 1);
	} */
	async borrar(id) {
		try{
			const todos = await this.listarAll()
			if(todos.length > 0){
				let index = todos.findIndex((prod) => prod.id == id);
				let productoBorrado = todos.splice(index, 1)
				await fs.promises.writeFile("./persistencia/productos.txt", JSON.stringify(todos, null, 2),"utf-8")
				return productoBorrado;
			}else{
				return { error: "no hay productos cargados" }	
			}
        }
        catch (error){
            console.log(error)
        }
	}
}
