import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CarritoDTO } from './dto/carrito.dto';
import { CarritoInterface } from './interface/carrito.interface';
import { CarritoService } from './carrito.service';
import { ProductoDTO } from 'src/product/dto/product.dto';
import { ProductInterface } from 'src/product/interface/product.interface';

@Controller('carrito')
export class CarritoController {
    constructor(private readonly carritoService: CarritoService) {}
    @Get()
    async listarAllCarritos(): Promise<CarritoInterface[]> {
      return this.carritoService.listarAll();
    }
  
    @Get(':id')
    async listarCarritos(@Param() id: string): Promise<CarritoInterface> {
      return this.carritoService.listar(id);
    }
    @Get(':id')
    async listarProdDeCarrito(@Param() id: string): Promise<CarritoInterface[]> {
      return this.carritoService.listarProdDeCarrito(id);
    }
  
    @Post(':id/product/:_id')
    async guardarProductoEnCarrito(
        @Param('id') id:string, @Param('_id') _id: string
    ): Promise<ProductInterface> {
      console.log("id de carrito y productos", id);
      
      return this.carritoService.guardarProductoEnCarrito(id, _id);
    }
    @Post()
    async crearCarrito(carritoDTO: CarritoDTO): Promise<CarritoInterface> {
    console.log(carritoDTO)
    return this.carritoService.crearCarrito(carritoDTO);
    }
  
  @Delete(':id/product/:_id')
  async borrarProd(
    @Param('id') id:string, @Param('_id') _id: string
  ): Promise<ProductInterface> {
    return this.carritoService.borrarProd(id, _id);
  }
  @Delete(':id')
  async borrarCarr(
      @Param() id:string
  ): Promise<CarritoInterface> {
    return this.carritoService.borrarCarr(id);
  } 
}
