import { Controller, Get, Param, Delete, Post, Put, Body, NotFoundException, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { LoggerInterceptor } from 'src/shared/interceptors/logger.interceptor';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {
        this.productsService = productsService;
    }
    @UseInterceptors(LoggerInterceptor)
    @Get('/') 
    getAll(): any {
        return this.productsService.getAll();
    }
    @UseInterceptors(LoggerInterceptor)
    @Get('/:id')
    public getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const prod = this.productsService.getById(id);
        if(!prod) throw new NotFoundException('Product not found');
        return prod;
    }
    @Delete('/:id')
    public deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        if(!this.productsService.getById(id)) {
            throw new NotFoundException('Product not found');
        }
        this.productsService.deleteById(id);
        return { success: true};
    }
    @Post('/')
    create(@Body() productData: CreateProductDTO) {
        return this.productsService.create(productData);
    }
    @Put('/:id')
    update(
        @Param('id', new ParseUUIDPipe()) id: string, // first pipe to check the id
        @Body() productData: UpdateProductDTO,  // second pipe is a global check
    ) {
        if (!this.productsService.getById(id))
            throw new NotFoundException('Product not found');

        this.productsService.updateById(id, productData);
        return { success: true }
    }

}