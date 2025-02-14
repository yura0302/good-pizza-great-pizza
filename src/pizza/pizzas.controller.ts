import { Controller } from '@nestjs/common';
import { PizzaService } from './pizzas.service';

@Controller('pizza')
export class PizzaController {
  constructor(private pizzaService: PizzaService) {}
}
