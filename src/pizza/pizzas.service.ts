import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponsePizzaDto } from 'src/dto/response-pizza.dto';
import { Order } from 'src/entity/order.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class PizzaService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async getPizzaByOrder(id: number): Promise<ResponsePizzaDto> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['connects', 'connects.ingredient'],
    });
    if (!order) {
      throw new NotFoundException(`Can't find pizza with id ${id}`);
    }
    console.log(order.connects[0].ingredient);

    const response: ResponsePizzaDto = {
      pizzaId: order.id,
      pizzaName: order.name,
      pizzaScript: order.script,
      ingredients: {
        ingredientName: '',
      },
    };
    return response;
  }
}
