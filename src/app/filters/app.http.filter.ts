import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Catch, HttpException, Logger } from '@nestjs/common';
import type { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import type { AppException } from '@/app/interfaces/app.interface';

@Catch(HttpException)
export class AppHttpFilter implements ExceptionFilter {
  private readonly debug: boolean;

  private readonly logger = new Logger(AppHttpFilter.name);

  constructor(private readonly configService: ConfigService) {
    this.debug = this.configService.get<boolean>('app.debug', false);
  }

  async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();

    // Log the exception if debug mode is enabled
    if (this.debug) {
      this.logger.error(exception);
    }

    const responseException = exception.getResponse();
    const statusHttp = exception.getStatus();
    const defaultMessage = 'Internal Server Error';

    let statusCode = statusHttp;
    let message = typeof responseException === 'string' ? responseException : defaultMessage;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let errors: any;
    let data: Record<string, unknown> | undefined;

    // Check if the responseException is of type AppException
    if (this.isAppException(responseException)) {
      statusCode = responseException.statusCode;
      message = responseException.message;
      errors = responseException.errors;
      data = responseException.data;
    }

    const responseBody: AppException = {
      statusCode,
      message,
      errors,
      data,
    };

    response.status(statusCode).json(responseBody);
  }

  private isAppException(obj: unknown): obj is AppException {
    return (
      typeof obj === 'object'
      && obj !== null
      && 'statusCode' in obj
      && 'message' in obj
    );
  }
}
