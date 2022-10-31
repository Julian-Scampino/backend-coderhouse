import mongoose from "mongoose";
import CarritoModel from "../../Modelo/CarritoModelo.js";
import ProductoModel from "../../Modelo/ProductoModelo.js";

export default class Carrito {
	constructor() {
        this.url = "mongodb://localhost:27017/ecommerce"
        this.mongodb = mongoose.connect
	}
	async listar(id) {
		try{
			await this.mongodb(this.url)
            let carrito = await CarritoModel.findById(id)
            if(carrito){
                return carrito
            }else{
                return { error: "no hay carrito cargados" } 
            }   
        }
        catch (error){
            console.log(error)
        }
	}
	async listarProdDeCarrito(id) {
		try{
			await this.mongodb(this.url)
            let carrito = await CarritoModel.findById(id)
			if(carrito.productos.length > 0){
				return carrito.productos
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
			await this.mongodb(this.url)
            let carritos = await CarritoModel.find()
			return carritos.length > 0
			? carritos
			: { error: "no hay carritos cargados" };
        }
        catch (error){
            console.log(error)
        }
	}
	async crearCarrito(body) {
		try{
			await this.mongodb(this.url)
            let carrito = new CarritoModel(body)
            await carrito.save()
			return carrito;
		}catch (error){
            console.log(error)
        }
	}
	async guardarProductoEnCarrito(idProd, idCarrito) {
		try{
            await this.mongodb(this.url)
            let producto = await ProductoModel.findById(idProd)
            let carrito = await CarritoModel.findById(idCarrito)
            carrito.productos <= 0 ? carrito.productos = [producto] : carrito.productos = [...carrito.productos, producto]
            await carrito.save()
			return producto;
		}
		catch (error){
            console.log(error)
        }
	}
	async borrarProd(id, id_prod) {
		try{
			await this.mongodb(this.url)
            let producto = await ProductoModel.findById(id_prod)
            let carrito = await CarritoModel.findById(id)
            let index = carrito.productos.findIndex((prod) => prod._id == id_prod)
            carrito.productos.splice(index, 1)
            await CarritoModel.findByIdAndUpdate(id, carrito)
			return producto;
        }catch (error){
            console.log(error)
        }
	}
	async borrarCarr(id) {
		try{
			await this.mongodb(this.url)
            return await CarritoModel.findByIdAndDelete(id)
        }
        catch (error){
            console.log(error)
        }
	}
}
