import { Module } from '@nestjs/common';
import { PizzaController } from './pizzas.controller';
import { PizzaService } from './pizzas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';
import { Ingredient } from 'src/entity/ingredient.entity';
import { Connect } from 'src/entity/connect.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Ingredient, Connect])],
  controllers: [PizzaController],
  providers: [PizzaService],
})
export class PizzasModule {}
