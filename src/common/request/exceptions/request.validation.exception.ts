import { HttpException, HttpStatus } from '@nestjs/common';
import type { ValidationError } from 'class-validator';
import { EnumRequestStatusCodeError } from '@/common/request/constants/request.status-code.constant';

export class RequestValidationException extends HttpException {
  constructor(errors: ValidationError[]) {
    super(
      {
        statusCode: EnumRequestStatusCodeError.REQUEST_VALIDATION_ERROR,
        message: 'request.validation',
        errors,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
