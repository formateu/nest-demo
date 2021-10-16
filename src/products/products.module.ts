import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.model';
import { CurrencyCalculatorModule } from 'src/currency-calculator/currency-calculator.module';
import { CurrencyCalculatorService } from 'src/currency-calculator/currency-calculator.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    SequelizeModule.forFeature([Product]),
    CurrencyCalculatorModule, // <- isn't this an overkill? (Separate module for 1 httpservice handle)
    HttpModule
  ],
  controllers: [ProductsController],
  providers: [CurrencyCalculatorService, ProductsService],
})
export class ProductsModule { }
