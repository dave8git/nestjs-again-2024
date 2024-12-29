import { Controller, Get, Param, NotFoundException, UseInterceptors, Post, Delete, Body, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { LoggerInterceptor } from 'src/shared/interceptors/logger.interceptor';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDTO } from 'src/orders/dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {
        this.ordersService = ordersService;
    }

    @Get('/')
    getAll(): any {
        return this.ordersService.getAll();
    }

    @UseInterceptors(LoggerInterceptor)
    @Get('/:id')
    public getById(@Param('id', new ParseUUIDPipe()) id: string) {
        const order = this.ordersService.getById(id);
        if (!order) throw new NotFoundException('Order not found');
        return order;
    }
    @Delete('/:id')
    public deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
        if (!this.ordersService.getById(id)) {
            throw new NotFoundException('Product not found');
        }
        this.ordersService.deleteById(id);
        return { success: true };
    }
    @Post('/')
    public create(@Body() orderData: CreateOrderDTO) {
        return this.ordersService.create(orderData);
    }
    @Put('/:id')
    update(
        @Param('id', new ParseUUIDPipe()) id: string, 
        @Body() orderData: UpdateOrderDTO, 
    ) {
        if(!this.ordersService.getById(id))
            throw new NotFoundException('Product not found')

        this.ordersService.updateById(id, orderData);
        return { success: true }
    }
}