import { Injectable } from '@nestjs/common';
import mongoose, { connect } from 'mongoose';
import { CarritoDTO } from 'src/carrito/dto/carrito.dto'
import { CarritoModel } from 'src/carrito/models/carrito.model'
import { ProductModel } from 'src/product/models/products.model';

@Injectable()
export class CarritoMongo {
  private mongodb;
  private url: string;
  constructor() {
    this.url = process.env.DB_MONGO;
    this.mongodb = connect;
  }
  async listar(_id : string) {
    try{
        await this.mongodb(this.url)
        let carritoId = new mongoose.Types.ObjectId(_id);
        let carrito = await CarritoModel.findById(carritoId)
        return carrito
        //Lo de abajo me da error
        /* if(carrito){
            return carrito
        }else{
            return { error: "no hay carrito cargados" } 
        }   */
    }
    catch (error){
        console.log(error)
    }
}
async listarProdDeCarrito(id: string) {
    try{
        await this.mongodb(this.url)
        let carritoId = new mongoose.Types.ObjectId(id);
        let carrito = await CarritoModel.findById(carritoId)
        return carrito.productos
        //Lo de abajo me da error
        /* if(carrito.productos.length > 0){
            return carrito.productos
        }else{
            return { error: "no hay productos en el carrito" }	
        } */
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
        : [];
    }
    catch (error){
        console.log(error)
    }
}
async crearCarrito(body: CarritoDTO) {
    try{
        await this.mongodb(this.url)
        let carrito = new CarritoModel(body)
        await carrito.save()
        return carrito;
    }catch (error){
        console.log(error)
    }
}
async guardarProductoEnCarrito(idCarrito : string, idProd : string) {
    try{
        await this.mongodb(this.url)
        console.log("id producto", idProd);
        
        let productId = new mongoose.Types.ObjectId(idProd);
        let producto = await ProductModel.findById(productId)
        console.log("id producto encontrado byID", idProd);
        let carritoId = new mongoose.Types.ObjectId(idCarrito);
        let carrito = await CarritoModel.findById(carritoId)
        carrito.productos.length <= 0 ? carrito.productos = [producto] : carrito.productos = [...carrito.productos, producto]
        await carrito.save()
        return producto;
    }
    catch (error){
        console.log(error)
    }
}
async borrarProd(id: string, id_prod: string) {
    try{
        await this.mongodb(this.url)
        let productId = new mongoose.Types.ObjectId(id_prod);
        let producto = await ProductModel.findById(productId)
        let carritoId = new mongoose.Types.ObjectId(id);
        let carrito = await CarritoModel.findById(carritoId)
        let index = carrito.productos.findIndex((prod) => prod._id == id_prod)
        carrito.productos.splice(index, 1)
        await CarritoModel.findByIdAndUpdate(id, carrito)
        return producto;
    }catch (error){
        console.log(error)
    }
}
async borrarCarr(id: string) {
    try{
        await this.mongodb(this.url)
        let carritoId = new mongoose.Types.ObjectId(id);
        return await CarritoModel.findByIdAndDelete(carritoId)
    }
    catch (error){
        console.log(error)
    }
}
}