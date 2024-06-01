import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty({ description: 'El título del producto.' })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'La descripción del producto.' })
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'La cantidad del producto.' })
  @IsNumber()
  readonly amount: number;

  @ApiProperty({
    description:
      'Las imágenes del producto, solo se deben enviar los enlaces de donde se guardan',
  })
  @IsString({ each: true })
  readonly images: string[];

  @ApiProperty({ description: 'El precio del producto.' })
  @IsNumber()
  readonly price: number;

  @ApiProperty({ description: 'El slug del producto.' })
  @IsString()
  readonly slug: string;

  @ApiProperty({ description: 'La cantidad en stock del producto.' })
  @IsNumber()
  readonly inStock: number;

  @ApiProperty({ description: 'Las etiquetas del producto.' })
  @IsString({ each: true })
  readonly tags: string[];

  @ApiProperty({ description: 'Las tallas del producto.' })
  @IsString({ each: true })
  readonly sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL')[];

  @ApiProperty({ description: 'El tipo de producto.' })
  @IsString()
  readonly types: 'shirts' | 'pants' | 'hoodies' | 'hats';

  @ApiProperty({ description: 'El género del producto.' })
  @IsString()
  readonly gender: 'men' | 'women' | 'unisex' | 'kid';
}
