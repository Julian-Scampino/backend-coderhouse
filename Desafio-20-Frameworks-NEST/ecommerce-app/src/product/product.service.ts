import { Injectable } from '@nestjs/common';
import { ProductMongo } from 'src/utils/productMongo.service';
import { ProductoDTO } from './dto/product.dto';
import { ProductInterface } from './interface/product.interface';

@Injectable()
export class ProductService {
  constructor(private readonly productMongo: ProductMongo) {}

  async getAll(): Promise<ProductInterface[]> {
    return await this.productMongo.getAll();
  }

  async getById(id: string): Promise<ProductInterface> {
    return await this.productMongo.getById(id);
  }

  async createProduct(product: ProductoDTO): Promise<ProductInterface> {
    return await this.productMongo.createData(product);
  }

  async deleteById(id: string): Promise<ProductInterface> {
    return await this.productMongo.deleteById(id);
  }
}
