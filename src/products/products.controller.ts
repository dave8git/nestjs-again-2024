import { Controller, Get, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {
        this.productsService = productsService;
    }

    @Get('/') 
    getAll(): any {
        return this.productsService.getAll();
    }
    @Get('/:id')
    public getById(@Param('id') id: string) {
        return this.productsService.getById(id);
    }
    @Delete('/:id')
    public deleteById(@Param('id') id: string) {
        this.productsService.deleteById(id);
        return { success: true};
    }
}
