import { Module } from '@nestjs/common';
import { PizzaModule } from './pizza/pizzas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), PizzaModule],
})
export class AppModule {}
