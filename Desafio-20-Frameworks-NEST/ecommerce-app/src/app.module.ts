import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CarritoModule } from './carrito/carrito.module';

@Module({
  imports: [ProductModule, ConfigModule.forRoot({}), CarritoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
