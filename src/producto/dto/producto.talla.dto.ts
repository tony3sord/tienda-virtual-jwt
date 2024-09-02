import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductoTallaDto {
  @ApiProperty({ description: 'La talla del producto.' })
  @IsString()
  readonly size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

  @ApiProperty({ description: 'El precio del producto para esta talla.' })
  @IsNumber()
  readonly price: number;

  @ApiProperty({ description: 'La cantidad en stock para esta talla.' })
  @IsNumber()
  readonly amount: number;
}
