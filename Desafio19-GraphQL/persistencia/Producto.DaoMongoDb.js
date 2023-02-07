import mongoose from "mongoose";
import ProductoModel from "./models/ProductoModelo.js";
import * as dotenv from 'dotenv'
dotenv.config()

export default class Producto {
	static productos = [];
	constructor() {
        this.url = `mongodb+srv://coder1:${process.env.PASSWORDATLAS}@cluster0.lubyki3.mongodb.net/?retryWrites=true&w=majority`
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
    async borrarTodo() {
		try{
            const todos = []
			await this.mongodb(this.url)
			await ProductoModel.remove({})
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
