import { Injectable } from '@nestjs/common';
import { Ingredient } from 'src/entity/ingredient.entity';
import { Repository, DataSource } from 'typeorm';

@Injectable()
export class IngredientRepository extends Repository<Ingredient> {
  constructor(dataSource: DataSource) {
    super(Ingredient, dataSource.createEntityManager());
  }
}
