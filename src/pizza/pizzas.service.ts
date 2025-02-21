import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponsePizzaDto } from 'src/dto/response-pizza.dto';
import { SearchPizzaDto } from 'src/dto/search-pizza.dto';
import { Order } from 'src/entity/order.entity';
import { ILike } from 'typeorm';
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
    const search = await this.orderRepository.find({
      where: [{ name: ILike(`%${order}%`) }, { script: ILike(`%${order}%`) }],
      order: { base_order_id: 'ASC' },
    });

    return search.map((result) => ({
      id: result.id,
      name: result.name,
      script: result.script,
    }));
  }
}
