import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {
    productModel.sync({ alter: true }); // altering is not production safe !!
  }

  insertProduct(title: string, desc: string, price: number): string {
    const prodId = uuidv4().toString();
    // create = build + save
    const newProduct = this.productModel.create({
      id: prodId,
      title: title,
      description: desc,
      price: price,
    });

    return prodId;
  }

  async getProducts(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  async getSingleProduct(productId: string): Promise<Product> {
    return this.productModel.findOne({
      where: {
        id: productId,
      },
    });
  }

  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ): Promise<void> {
    const product = await this.getSingleProduct(productId);
    const newProduct = {
      id: productId ? productId : product.id,
      title: title ? title : product.title,
      description: desc ? desc : product.description,
      price: price ? price : product.price,
    };
    await product.save();
  }

  async remove(productId: string): Promise<void> {
    const product = await this.getSingleProduct(productId);
    await product.destroy();
  }
}
