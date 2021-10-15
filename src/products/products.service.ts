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

  insertProduct(title: string, desc: string, price: number) {
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

  getSingleProduct(productId: string) {
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
  ) {
    const product = await this.getSingleProduct(productId);
    if (title) {
      product.title = title;
    }

    if (desc) {
      product.description = desc;
    }

    if (price) {
      product.price = price;
    }

    await product.save();
  }

  async remove(productId: string): Promise<void> {
    const product = await this.getSingleProduct(productId);
    await product.destroy();
  }
}
