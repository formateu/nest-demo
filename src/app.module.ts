import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Product } from './products/product.model';
import { CurrencyCalculatorModule } from './currency-calculator/currency-calculator.module';
import { GcTranslateModule } from './gc-translate/gc-translate.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 5432),
        username: process.env.DB_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        models: [Product],
        synchronize: true,
      }),
    }),
    ProductsModule,
    CurrencyCalculatorModule,
    GcTranslateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private sequelize: Sequelize) {}
}
