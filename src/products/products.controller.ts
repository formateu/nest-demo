import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CurrencyCalculatorService } from 'src/currency-calculator/currency-calculator.service';
import { CurrencyCalculatorModule } from 'src/currency-calculator/currency-calculator.module';
import { map, tap } from 'rxjs';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService, private readonly currCalcService: CurrencyCalculatorService) { }

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ): any {
        const genId = this.productsService.insertProduct(
            prodTitle,
            prodDesc,
            prodPrice,
        );
        return { id: genId };
    }

    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId);
    }

    @Get('/price/:id/:currency')
    async getProductPriceInCurrency(@Param('id') id: string, @Param('currency') currency: string) {
        let rate = undefined;
        const rate1 = this.currCalcService.getCurrencyRate(currency).pipe(tap(r => rate = r)).subscribe();
        const product = await this.productsService.getSingleProduct(id);
        if (product && rate) {
            const newPrice = product.price / rate;
            return newPrice;
        } else {
            console.log(product);
            console.log(rate);
        }

        return null;
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string) {
        this.productsService.remove(prodId);
        return null;
    }
}
