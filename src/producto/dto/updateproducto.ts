import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ProductoTallaDto } from './producto.talla.dto';

export class UpdateProductoDto {
  @ApiProperty({ description: 'El título del producto.' })
  @IsString()
  @IsOptional()
  readonly title: string;

  @ApiProperty({ description: 'La descripción del producto.' })
  @IsString()
  @IsOptional()
  readonly description: string;

  @ApiProperty({
    description:
      'Las imágenes del producto, solo se deben enviar los enlaces de donde se guardan',
  })
  @IsOptional()
  @IsString({ each: true })
  readonly images: string[];

  @ApiProperty({ description: 'El slug del producto.' })
  @IsOptional()
  @IsString()
  readonly slug: string;

  @ApiProperty({ description: 'Las etiquetas del producto.' })
  @IsOptional()
  @IsString({ each: true })
  readonly tags: string[];

  @ApiProperty({
    description: 'Las tallas del producto con sus precios y cantidades.',
  })
  @ValidateNested({ each: true })
  @Type(() => ProductoTallaDto)
  @IsOptional()
  @IsArray()
  readonly tallas: ProductoTallaDto[];

  @ApiProperty({ description: 'El tipo de producto.' })
  @IsOptional()
  @IsString()
  readonly types: 'shirts' | 'pants' | 'hoodies' | 'hats';

  @ApiProperty({ description: 'El género del producto.' })
  @IsOptional()
  @IsString()
  readonly gender: 'men' | 'women' | 'unisex' | 'kid';
}
