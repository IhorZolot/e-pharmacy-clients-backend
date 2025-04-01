import { IsMongoId, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateCartItemDto {
  @IsMongoId()
  product: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity?: number;
}
