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

    if (!order) throw new NotFoundException(`Can't find pizza with id ${id}`);

    const baseOrder = order.base_order_id
      ? await this.orderRepository.findOne({
          where: { id: order.base_order_id },
          relations: ['connects', 'connects.ingredient'],
        })
      : order;

    return {
      pizzaId: order.id,
      pizzaName: order.name,
      pizzaImageUrl: order.imageUrl,
      pizzaScript: order.script,
      ingredients: baseOrder.connects.map((connect) => ({
        ingredientName: connect.ingredient.name,
        ingredientImageUrl:
          typeof connect.ingredient.imageUrl === 'string'
            ? connect.ingredient.imageUrl
            : '',
      })),
    };
  }
}
