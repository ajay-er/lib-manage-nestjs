import type { ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Catch, Logger } from '@nestjs/common';
import type { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { RequestValidationException } from '@/common/request/exceptions/request.validation.exception';
import type { AppException } from '@/app/interfaces/app.interface';

@Catch(RequestValidationException)
export class AppValidationFilter implements ExceptionFilter {
  private readonly debug: boolean;

  private readonly logger = new Logger(AppValidationFilter.name);

  constructor(private readonly configService: ConfigService) {
    this.debug = this.configService.get<boolean>('app.debug', false);
  }

  async catch(
    exception: RequestValidationException,
    host: ArgumentsHost,
  ): Promise<void> {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();

    // Log the exception if debug mode is enabled
    if (this.debug) {
      this.logger.error(exception);
    }

    // Extract necessary information from the exception
    const statusHttp: HttpStatus = exception.getStatus();
    const responseException = exception.getResponse() as {
      statusCode: number;
      message: string;
      errors: unknown[];
    };
    const { statusCode } = responseException;
    const defaultMessage = 'Validation Error';

    // Construct the response body
    const responseBody: AppException = {
      statusCode,
      message: responseException.message ?? defaultMessage,
      errors: responseException.errors,
    };

    // Send the response
    response.status(statusHttp).json(responseBody);
  }
}
