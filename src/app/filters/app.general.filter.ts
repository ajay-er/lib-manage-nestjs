/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import {
  Catch, HttpException, HttpStatus, Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';

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

  async catch(exception: any, host: ArgumentsHost): Promise<void> {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Log the exception if debug mode is enabled
    if (this.debug) {
      this.logger.error(exception);
    }

    // Default error response for other exceptions
    let statusHttp = exception.message ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR;
    const defaultMessage = exception.message ?? 'Internal Server Error';

    // Handling HTTP exceptions
    if (exception instanceof HttpException) {
      const responseBody = exception.getResponse();
      statusHttp = exception.getStatus();
      httpAdapter.reply(response, responseBody, statusHttp);
      return;
    }

    const responseBody = {
      statusCode: statusHttp,
      message: defaultMessage,
    };
    response.status(statusHttp).json(responseBody);
  }
}
