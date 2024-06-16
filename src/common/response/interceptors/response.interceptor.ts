/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import type { ResponseDto } from '@/common/response/dtos/response.dto';
import { RESPONSE_MESSAGE } from '@/common/response/constants/response.constant';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto> {
    if (context.getType() === 'http') {
      const handler = context.getHandler();
      const responseMessage = this.reflector.get<string>(RESPONSE_MESSAGE, handler) || 'Success';

      return next.handle().pipe(
        map((data: any) => {
          const ctx: HttpArgumentsHost = context.switchToHttp();
          const response = ctx.getResponse();

          const { statusCode } = response as ResponseDto;

          return {
            statusCode,
            data,
            message: responseMessage,
          };
        }),
      );
    }
    return next.handle();
  }
}
