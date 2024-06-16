import {
  IsString, IsOptional, MaxLength, IsDateString, IsMongoId,
} from 'class-validator';

export class BookDto {
  @IsString()
    title: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
    description?: string;

  @IsMongoId()
    authorId: string;

  @IsDateString()
    publishedDate: Date;
}
