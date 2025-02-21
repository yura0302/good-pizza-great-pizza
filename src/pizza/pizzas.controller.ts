import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PizzaService } from './pizzas.service';
import { ResponsePizzaDto } from 'src/dto/response-pizza.dto';
import { SearchPizzaDto } from 'src/dto/search-pizza.dto';

@Controller('pizza')
export class PizzaController {
  constructor(private pizzaService: PizzaService) {}

  @Get('/orderId/:id')
  getPizzaByOrder(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponsePizzaDto> {
    return this.pizzaService.getPizzaByOrder(id);
  }

  @Get()
  getPizzaBySearch(@Query('order') order: string): Promise<SearchPizzaDto[]> {
    return this.pizzaService.getPizzaBySearch(order);
  }
}
