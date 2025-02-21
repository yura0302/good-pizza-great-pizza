import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResponsePizzaDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  name?: string;

  @IsString()
  imageUrl?: string;

  @IsString()
  script?: string;

  @IsString()
  ingredients: {
    name: string;
    imageUrl?: string;
  }[];
}
