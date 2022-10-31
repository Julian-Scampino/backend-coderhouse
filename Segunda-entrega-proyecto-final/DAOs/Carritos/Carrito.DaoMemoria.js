import Producto from "../Productos/Producto.DaoMemoria.js";

export default class Carrito {
	constructor() {
		this.producto = new Producto();
		this.carritos = [];
		this.id = 1;
	}
	async listar(id) {
		try{
			if(this.carritos.length > 0){
				let carrito = this.carritos.find((carr) => carr.id == id);
				return carrito
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
			if(this.carritos.length > 0){
				let carritos = this.carritos.find((carr) => carr.id == id);
				return carritos.productos
			}else{
				return { error: "no hay carritos cargados" }	
			}
        }
        catch (error){
            console.log(error)
        }
	}
	async listarAll() {
		try{
			return this.carritos.length
			? this.carritos
			: { error: "no hay carritos cargados" };
        }
        catch (error){
            console.log(error)
        }
	}
	async crearCarrito() {
		try{
			let carr
			if (this.carritos.length <= 0 || this.carritos == undefined) {
            	carr = { id: this.id++, timeStamp: Date.now(), productos: [] };
            }else if (this.carritos.length > 0) {
                const id = this.carritos.sort((a, b) => b.id - a.id)[0].id;
                carr = { id: id + 1, timeStamp: Date.now(), productos: [] };
            }
			this.carritos.push(carr);
			return carr;
		}catch (error){
            console.log(error)
        }
	}
	async guardarProductoEnCarrito(idProd, idCarrito) {
		try{
			const producto = await this.producto.listar(idProd);
			this.carritos.forEach((carro) => {
				carro.id == idCarrito ? carro.productos.push(producto) : null;
			});
			return producto;
		}
		catch (error){
            console.log(error)
        }
	}
	async borrarProd(id, id_prod) {
		try{
			let productoBorrado
			const todos = await this.listarAll()
			if(todos.length > 0){
				let carrito = todos.find((carr) => carr.id == id);
				carrito.productos.forEach((producto, index)=>{
					producto.id == id_prod ? productoBorrado = carrito.productos.splice(index, 1) : null
				})
				return productoBorrado;
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
