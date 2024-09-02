import {
  IsNumber,
  IsString,
  ValidateNested,
  IsArray,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ProductoTallaDto } from './producto.talla.dto';

export class CreateProductoDto {
  @ApiProperty({ description: 'El título del producto.' })
  @IsString()
  readonly title: string;

  @ApiProperty({ description: 'La descripción del producto.' })
  @IsString()
  readonly description: string;

  @ApiProperty({
    description:
      'Las imágenes del producto, solo se deben enviar los enlaces de donde se guardan',
  })
  @IsString({ each: true })
  readonly images: string[];

  @ApiProperty({ description: 'El slug del producto.' })
  @IsString()
  readonly slug: string;

  @ApiProperty({ description: 'Las etiquetas del producto.' })
  @IsString({ each: true })
  readonly tags: string[];

  @ApiProperty({ description: 'la cantidad existentes en carritos.' })
  @IsNumber()
  @IsOptional()
  readonly inStock?: number;

  @ApiProperty({
    description: 'Las tallas del producto con sus precios y cantidades.',
  })
  @ValidateNested({ each: true })
  @Type(() => ProductoTallaDto)
  @IsArray()
  readonly tallas: ProductoTallaDto[];

  @ApiProperty({ description: 'El tipo de producto.' })
  @IsString()
  readonly types: 'shirts' | 'pants' | 'hoodies' | 'hats';

  @ApiProperty({ description: 'El género del producto.' })
  @IsString()
  readonly gender: 'men' | 'women' | 'unisex' | 'kid';
}
