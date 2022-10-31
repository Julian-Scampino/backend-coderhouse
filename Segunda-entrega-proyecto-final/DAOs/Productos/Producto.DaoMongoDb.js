import mongoose from "mongoose";
import ProductoModel from "../../Modelo/ProductoModelo.js";

export default class Producto {
	static productos = [];
	constructor() {
        this.url = "mongodb://localhost:27017/ecommerce"
        this.mongodb = mongoose.connect
	}
	async listar(id) {
		try{
			await this.mongodb(this.url)
            let producto = await ProductoModel.findById(id)
            if(producto){
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
            await this.mongodb(this.url)
			let todos = await ProductoModel.find()
			return todos.length
			? todos
			: { error: "no hay productos cargados" };
        }
        catch (error){
            console.log(error)
        }
	}
	async guardar(prod) {
		try{
			await this.mongodb(this.url)
            const nuevoProducto = new ProductoModel(prod)
            await nuevoProducto.save()
            return prod;
        }
        catch (error){
            console.log(error)
        }
	}
	async actualizar(prod, id) {
		try{
			await this.mongodb(this.url)
			return await ProductoModel.findByIdAndUpdate(id, prod)
        }
        catch (error){
            console.log(error)
        }
	}
	async borrar(id) {
		try{
			await this.mongodb(this.url)
			return await ProductoModel.findByIdAndDelete(id)
        }
        catch (error){
            console.log(error)
        }
	}
}
