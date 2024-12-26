import { Controller, Get, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {
        this.ordersService = ordersService;
    }

    @Get('/')
    getAll(): any {
        return this.ordersService.getAll();
    }

    @Get('/:id') 
    public getById(@Param('id') id: string) {
        return this.ordersService.getById(id);
    }
}
