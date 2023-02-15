import { Injectable } from '@nestjs/common';
import mongoose, { connect } from 'mongoose';
import { ProductoDTO } from 'src/product/dto/product.dto';
import { ProductModel } from 'src/product/models/products.model';

@Injectable()
export class ProductMongo {
  private mongodb;
  private url: string;
  constructor() {
    this.url = process.env.DB_MONGO;
    this.mongodb = connect;
  }

  // Crear Archivo con el producto

  async save(prod) {
    try {
      console.log(`guardando en Mongo`);
      await this.mongodb(this.url);
      const result = await prod.save();
      console.log(`result ${result}`);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async createData(prod: ProductoDTO) {
    try {
      await this.mongodb(this.url);
      const newProduct = await this.save(
        new ProductModel({
          title: prod.title,
          price: prod.price,
          thumbnail: prod.thumbnail,
          stock: prod.stock,
        }),
      );
      console.log(`newProduct ${newProduct}`);
      return await newProduct;
    } catch (err) {
      console.log(err);
    }
  }

  // Obtener producto por Id
  async getById(id: string) {
    try {
      console.log(id);
      await this.mongodb(this.url);
      const productId = new mongoose.Types.ObjectId(id);
      return await ProductModel.findById(productId);
    } catch (error) {
      console.log(error);
      throw { error: 'Producto no existe' };
    }
  }
  // Obtener todos los productos

  async getAll() {
    try {
      console.log('leyendo en mongo');
      await this.mongodb(this.url);
      return await ProductModel.find();
    } catch (err) {
      console.log(err);
      throw { error: 'No existen productos' };
    }
  }

  // Borrar un producto
  async deleteById(id: string) {
    try {
      await this.mongodb(this.url);
      const productId = new mongoose.Types.ObjectId(id);
      return await ProductModel.findByIdAndDelete(productId);
    } catch (err) {
      throw { error: 'No existen productos' };
    }
  }
}
