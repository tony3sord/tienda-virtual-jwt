import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './createproducto';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {}
