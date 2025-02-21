import { IsNumber, IsString } from 'class-validator';

export class SearchPizzaDto {
  @IsNumber()
  id: number;

  @IsString()
  name?: string;

  @IsString()
  script?: string;
}
