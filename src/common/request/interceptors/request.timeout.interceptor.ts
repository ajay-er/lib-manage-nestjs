import type {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Observable } from 'rxjs';
import { throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { EnumRequestStatusCodeError } from '@/common/request/constants/request.status-code.constant';

@Injectable()
export class RequestTimeoutInterceptor
implements NestInterceptor<Promise<unknown>> {
  private readonly maxTimeoutInSecond: number;

  constructor(private readonly configService: ConfigService) {
    this.maxTimeoutInSecond = this.configService.get<number>('middleware.timeout');
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    if (context.getType() === 'http') {
      return next.handle().pipe(
        timeout(this.maxTimeoutInSecond),
        catchError((err) => {
          if (err instanceof TimeoutError) {
            throw new RequestTimeoutException({
              statusCode: EnumRequestStatusCodeError.REQUEST_TIMEOUT_ERROR,
              message: 'http.clientError.requestTimeOut',
            });
          }
          return throwError(() => err);
        }),
      );
    }

    return next.handle();
  }
}
