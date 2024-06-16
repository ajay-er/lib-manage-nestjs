/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer';
import type { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import {
  IsNotEmpty, IsString, Length, IsOptional, IsDate,
  ValidatorConstraint,
  Validate,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsAtLeastTenYearsOld', async: false })
class IsAtLeastTenYearsOld implements ValidatorConstraintInterface {
  validate(date: Date, _args: ValidationArguments) {
    const currentDate = new Date();
    const tenYearsAgo = new Date(
      currentDate.getFullYear() - 10,
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    return date <= tenYearsAgo;
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Birthdate must be at least 10 years ago';
  }
}

export class AuthorDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 60)
    name: string;

  @IsOptional()
  @IsString()
  @Length(3, 300)
    biography?: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @Validate(IsAtLeastTenYearsOld)
    birthDate: Date;
}
