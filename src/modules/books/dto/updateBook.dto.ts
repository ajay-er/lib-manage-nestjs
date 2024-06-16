import {
  IsDateString, IsMongoId, IsOptional, IsString, MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(50)
    title?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(300)
    description?: string;

  @IsMongoId()
  @IsOptional()
    authorId?: string;

  @IsDateString()
  @IsOptional()
    publishedDate?: Date;
}
