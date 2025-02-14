import { Module } from '@nestjs/common';
import { PizzaController } from './pizzas.controller';
import { PizzaService } from './pizzas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';
import { OrderRepository } from '../repository/order.repository';
import { ConnectRepository } from 'src/repository/connect.repository';
import { IngredientRepository } from 'src/repository/ingredient.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [PizzaController],
  providers: [
    PizzaService,
    OrderRepository,
    ConnectRepository,
    IngredientRepository,
  ],
})
export class PizzaModule {}
