import { Injectable } from '@nestjs/common';
import { Order } from 'src/entity/order.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(@InjectDataSource() dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }
}
