import {
  IsString, IsOptional, MaxLength, IsDateString, IsMongoId,
  MinLength,
} from 'class-validator';

export class BookDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
    title: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  @MinLength(6)
    description?: string;

  @IsMongoId()
    authorId: string;

  @IsDateString()
    publishedDate: Date;
}
