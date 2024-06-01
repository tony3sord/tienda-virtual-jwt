import { IsString } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  readonly title: string;
  readonly description: string;
  readonly amount: number;
  readonly images: string[];
  readonly price: number;
  readonly slug: string;
  readonly inStock: number;
  readonly tags: string[];
  readonly sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL')[];
  readonly types: 'shirts' | 'pants' | 'hoodies' | 'hats';
  readonly gender: 'men' | 'women' | 'unisex' | 'kid';
  @IsString()
  readonly password: string;
}
