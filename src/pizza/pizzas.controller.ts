import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PizzaService } from './pizzas.service';
import { ResponsePizzaDto } from 'src/dto/response-pizza.dto';

@Controller('pizza')
export class PizzaController {
  constructor(private pizzaService: PizzaService) {}

  @Get('/orderId/:id')
  getPizzaByOrder(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponsePizzaDto> {
    return this.pizzaService.getPizzaByOrder(id);
  }
}
