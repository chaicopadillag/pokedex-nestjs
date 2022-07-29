import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreatePokemonDto {
  @IsNotEmpty()
  @Length(3, 20)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;
}
