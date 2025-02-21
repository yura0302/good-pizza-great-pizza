import { Module } from '@nestjs/common';
import { PizzasModule } from './pizza/pizzas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), PizzasModule],
})
export class AppModule {}
