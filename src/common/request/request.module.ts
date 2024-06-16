/* eslint-disable max-len */
import type { DynamicModule } from '@nestjs/common';
import { HttpStatus, Module, ValidationPipe } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { RequestTimeoutInterceptor } from '@/common/request/interceptors/request.timeout.interceptor';
import type { ValidationError } from 'class-validator';
import { RequestValidationException } from '@/common/request/exceptions/request.validation.exception';

@Module({})
export class RequestModule {
  static forRoot(): DynamicModule {
    return {
      module: RequestModule,
      controllers: [],
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: RequestTimeoutInterceptor,
        },
        {
          provide: APP_PIPE,
          useFactory: () => new ValidationPipe({
            transform: true,
            skipUndefinedProperties: true,
            forbidUnknownValues: true,
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            exceptionFactory: async (errors: ValidationError[]) => new RequestValidationException(errors),
          }),
        },
      ],
      imports: [],
    };
  }
}
