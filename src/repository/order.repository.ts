import { Injectable } from '@nestjs/common';
import { Order } from 'src/entity/order.entity';
import { DataSource, ILike, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async findPizzaById(id: number) {
    return this.findOne({
      where: { id },
      relations: ['connects', 'connects.ingredient'],
    });
  }

  async findBaseOrder(id: number) {
    return this.findOne({
      where: { id },
      relations: ['connects', 'connects.ingredient'],
    });
  }

  async searchPizza(order: string) {
    return this.find({
      where: [{ name: ILike(`%${order}%`) }, { script: ILike(`%${order}%`) }],
      order: { base_order_id: 'ASC' },
    });
  }
}
