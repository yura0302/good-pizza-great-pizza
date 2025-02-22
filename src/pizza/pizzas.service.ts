import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponsePizzaDto } from 'src/dto/response-pizza.dto';
import { SearchPizzaDto } from 'src/dto/search-pizza.dto';
import { OrderRepository } from 'src/repository/order.repository';

@Injectable()
export class PizzaService {
  constructor(private orderRepository: OrderRepository) {}

  async getPizzaByOrder(id: number): Promise<ResponsePizzaDto> {
    const order = await this.orderRepository.findPizzaById(id);
    if (!order) throw new NotFoundException(`Can't find pizza with id ${id}`);

    const baseOrder = order.base_order_id
      ? await this.orderRepository.findBaseOrder(order.base_order_id)
      : order;
    return {
      id: order.id,
      name: order.name,
      imageUrl: order.imageUrl,
      script: order.script,
      ingredients: baseOrder.connects.map((connect) => ({
        name: connect.ingredient.name,
        imageUrl:
          typeof connect.ingredient.imageUrl === 'string'
            ? connect.ingredient.imageUrl
            : '',
      })),
    };
  }

  async getPizzaBySearch(order: string): Promise<SearchPizzaDto[]> {
    const search = await this.orderRepository.searchPizza(order);
    return search.map((result) => ({
      id: result.id,
      name: result.name,
      script: result.script,
    }));
  }
}
