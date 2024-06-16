import type { ExceptionFilter } from '@nestjs/common';
import {
  Catch, HttpException, HttpStatus, Logger,
} from '@nestjs/common';
import type { ArgumentsHost, HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import type { Response } from 'express';
import type { AppException } from '@/app/interfaces/app.interface';

@Catch()
export class AppGeneralFilter implements ExceptionFilter {
  private readonly debug: boolean;

  private readonly logger = new Logger(AppGeneralFilter.name);

  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly configService: ConfigService,
  ) {
    this.debug = this.configService.get<boolean>('app.debug', false);
  }

  async catch(exception: unknown, host: ArgumentsHost): Promise<void> {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();

    // Log the exception if debug mode is enabled
    if (this.debug) {
      this.logger.error(exception);
    }

    // Handling HTTP exceptions
    if (exception instanceof HttpException) {
      const responseBody = exception.getResponse();
      const statusHttp = exception.getStatus();
      httpAdapter.reply(ctx.getResponse(), responseBody, statusHttp);
      return;
    }

    // Default error response for non-HTTP exceptions
    const statusHttp: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    const defaultMessage = 'Internal Server Error';
    const responseBody: AppException = {
      statusCode: statusHttp,
      message: defaultMessage,
    };

    response.status(statusHttp).json(responseBody);
  }
}
