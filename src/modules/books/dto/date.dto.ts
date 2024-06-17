import { IsDateString } from 'class-validator';

export class DateDto {
  @IsDateString()
    startDate: string;

  @IsDateString()
    endDate: string;
}
