import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class DateDto {
  @ApiProperty({
    example: '2021-02-24',
  })
  @IsDateString()
    startDate: string;

  @ApiProperty({
    example: '2024-03-21',
  })
  @IsDateString()
    endDate: string;
}
