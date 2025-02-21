import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResponsePizzaDto {
  @IsNotEmpty()
  @IsNumber()
  pizzaId: number;

  @IsString()
  pizzaName?: string;

  @IsString()
  pizzaImageUrl?: string;

  @IsString()
  pizzaScript?: string;

  @IsString()
  ingredients: {
    ingredientName: string;
    ingredientImageUrl?: string;
  }[];
}
