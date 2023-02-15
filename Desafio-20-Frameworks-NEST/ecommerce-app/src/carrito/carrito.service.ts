import { Injectable } from '@nestjs/common';
import { CarritoMongo } from './utils/carritoMongo.service';
import { CarritoDTO } from './dto/carrito.dto';
import { CarritoInterface } from './interface/carrito.interface';
import { ProductInterface } from 'src/product/interface/product.interface';

@Injectable()
export class CarritoService {
    constructor(private readonly carritoMongo: CarritoMongo) {}
    async listarAll() : Promise<CarritoInterface[]>{
        return await this.carritoMongo.listarAll()
    }
    async listar(id: string): Promise<CarritoInterface> {
        return await this.carritoMongo.listar(id);
      }
      async listarProdDeCarrito(id: string): Promise<CarritoInterface[]> {
        return await this.carritoMongo.listarProdDeCarrito(id);
      }
      async guardarProductoEnCarrito(id: string, _id: string): Promise<ProductInterface> {
        return await this.carritoMongo.guardarProductoEnCarrito(id, _id );
      }
    
      async crearCarrito(product: CarritoDTO): Promise<CarritoInterface> {
        return await this.carritoMongo.crearCarrito(product);
      }
    
      async borrarCarr(id: string): Promise<CarritoInterface> {
        return await this.carritoMongo.borrarCarr(id);
      }
      async borrarProd(id: string, id_prod: string): Promise<ProductInterface> {
        return await this.carritoMongo.borrarProd(id, id_prod);
      }
}
