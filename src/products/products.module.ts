import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.model';
import { CurrencyCalculatorModule } from 'src/currency-calculator/currency-calculator.module';
import { CurrencyCalculatorService } from 'src/currency-calculator/currency-calculator.service';
import { HttpModule } from '@nestjs/axios';
import { GcTranslateModule } from 'src/gc-translate/gc-translate.module';
import { GcTranslateService } from 'src/gc-translate/gc-translate.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Product]),
    CurrencyCalculatorModule, // <- isn't this an overkill? (Separate module for 1 httpservice handle)
    HttpModule,
    GcTranslateModule,
  ],
  controllers: [ProductsController],
  providers: [CurrencyCalculatorService, ProductsService, GcTranslateService],
})
export class ProductsModule {}
