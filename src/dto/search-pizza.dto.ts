import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SearchPizzaDto {
  @IsNotEmpty()
  @IsNumber()
  pizzaId: number;

  @IsString()
  pizzaName?: string;

  @IsString()
  pizzaScript?: string;
}
