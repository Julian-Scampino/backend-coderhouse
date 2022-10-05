import Producto from "./Producto.class.js";
import fs from "fs"

export default class Carrito {
	constructor() {
		this.producto = new Producto();
		this.carritos = [];
		this.id = 1;
	}

	/* listar(id) {
		let prod = this.carritos.find((carr) => carr.id == id);
		return prod || { error: "carrito no encontrado" };
	} */
	async listar(id) {
		try{
			const todos = await this.listarAll();
			if(todos.length > 0){
				let carritos = todos.find((carr) => carr.id == id);
				return carritos
			}else{
				return { error: "no hay carritos cargados" }	
			}
        }
        catch (error){
            console.log(error)
        }
	}
	async listarProdDeCarrito(id) {
		try{
			const todos = await this.listarAll();
			if(todos.length > 0){
				let carritos = todos.find((carr) => carr.id == id);
				return carritos.productos
			}else{
				return { error: "no hay carritos cargados" }	
			}
        }
        catch (error){
            console.log(error)
        }
	}

	/* listarAll() {
		return this.carritos.length
			? this.carritos
			: { error: "no hay carritos cargados" };
	} */
	async listarAll() {
		try{
			const todos = await fs.promises.readFile("./persistencia/carritos.txt","utf-8")
			return todos.length
			? JSON.parse(todos,null,2)
			: { error: "no hay carritos cargados" };
        }
        catch (error){
            console.log(error)
        }
	}

	/* async crearCarrito() {
		try{
			const carr = { id: this.id++, timeStamp: Date.now(), productos: [] };
			this.carritos.push(carr);
			await fs.promises.writeFile("./persistencia/carritos.txt", JSON.stringify(this.carritos, null, 2),"utf-8")
			return carr;
		}catch (error){
            console.log(error)
        }
	} */
	async crearCarrito() {
		try{
			let carr
			const todos = await this.listarAll();
			if (todos.length <= 0 || todos == undefined) {
            	carr = { id: this.id++, timeStamp: Date.now(), productos: [] };
            }else if (todos.length > 0) {
                const id = todos.sort((a, b) => b.id - a.id)[0].id;
                carr = { id: id + 1, timeStamp: Date.now(), productos: [] };
            }
			this.carritos.push(carr);
			await fs.promises.writeFile("./persistencia/carritos.txt", JSON.stringify(this.carritos, null, 2),"utf-8")
			return carr;
		}catch (error){
            console.log(error)
        }
	}

	async guardarProductoEnCarrito(idProd, idCarrito) {
		try{
			const producto = await this.producto.listar(idProd);
			console.log("el producto traido para el carrito es", producto);
			this.carritos.forEach((carro) => {
				carro.id == idCarrito ? carro.productos.push(producto) : null;
			});
			await fs.promises.writeFile("./persistencia/carritos.txt", JSON.stringify(this.carritos, null, 2),"utf-8")
			return this.carritos;
		}
		catch (error){
            console.log(error)
        }
	}
	
	/* borrar(id) {
		let index = this.carritos.findIndex((carr) => carr.id == id);
		return this.carritos.splice(index, 1);
	} */
	async borrarProd(id, id_prod) {
		try{
			const todos = await this.listarAll()
			if(todos.length > 0){
				let carrito = todos.find((carr) => carr.id == id);
				carrito.productos.forEach((producto, index)=>{
					producto.id == id_prod ? carrito.productos.splice(index, 1) : null
				})
				await fs.promises.writeFile("./persistencia/carritos.txt", JSON.stringify(todos, null, 2),"utf-8")
				return carrito;
			}else{
				return { error: "no hay carritos cargados" }	
			}
        }
        catch (error){
            console.log(error)
        }
	}
	async borrarCarr(id) {
		try{
			const todos = await this.listarAll()
			if(todos.length > 0){
				let index = todos.findIndex((carr) => carr.id == id);
				let carroBorrado = todos.splice(index, 1)
				await fs.promises.writeFile("./persistencia/carritos.txt", JSON.stringify(todos, null, 2),"utf-8")
				return carroBorrado;
			}else{
				return { error: "no hay carritos cargados" }	
			}
        }
        catch (error){
            console.log(error)
        }
	}
}
