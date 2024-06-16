/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import {
  Catch, HttpException, HttpStatus, Logger,
} from '@nestjs/common';
import type { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import type { AppException } from '@/app/interfaces/app.interface';
import { RequestValidationException } from '@/common/request/exceptions/request.validation.exception';

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

    let statusCode: number;
    let message: string;
    let errors: any;
    let data: Record<string, unknown> | undefined;

    if (exception instanceof RequestValidationException) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = 'Validation failed';
      errors = exception.getResponse();
    } else {
      statusCode = exception.getStatus();
      message = exception.message || 'Internal Server Error';
      errors = exception.getResponse();
    }

    const responseBody: AppException = {
      statusCode,
      message,
      errors,
      data,
    };

    response.status(statusCode).json(responseBody);
  }
}
