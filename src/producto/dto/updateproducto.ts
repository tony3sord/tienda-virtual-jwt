import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductoDto {
  @ApiProperty({ description: 'El título del producto.' })
  @IsString()
  @IsOptional()
  readonly title?: string;

  @ApiProperty({ description: 'La descripción del producto.' })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @ApiProperty({ description: 'La cantidad del producto.' })
  @IsNumber()
  @IsOptional()
  readonly amount?: number;

  @ApiProperty({
    description:
      'Las imágenes del producto, solo se deben enviar los enlaces de donde se guardan',
  })
  @IsOptional()
  @IsString({ each: true })
  readonly images?: string[];

  @ApiProperty({ description: 'El precio del producto.' })
  @IsOptional()
  @IsNumber()
  readonly price?: number;

  @ApiProperty({ description: 'El slug del producto.' })
  @IsOptional()
  @IsString()
  readonly slug?: string;

  @ApiProperty({ description: 'La cantidad en stock del producto.' })
  @IsOptional()
  @IsNumber()
  readonly inStock?: number;

  @ApiProperty({ description: 'Las etiquetas del producto.' })
  @IsOptional()
  @IsString({ each: true })
  readonly tags?: string[];

  @ApiProperty({ description: 'Las tallas del producto.' })
  @IsOptional()
  @IsString({ each: true })
  readonly sizes?: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL')[];

  @ApiProperty({ description: 'El tipo de producto.' })
  @IsOptional()
  @IsString()
  readonly types?: 'shirts' | 'pants' | 'hoodies' | 'hats';

  @ApiProperty({ description: 'El género del producto.' })
  @IsOptional()
  @IsString()
  readonly gender?: 'men' | 'women' | 'unisex' | 'kid';
}
