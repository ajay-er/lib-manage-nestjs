import type { NestMiddleware } from '@nestjs/common';
import { HttpStatus, Injectable } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import type { CorsOptions } from 'cors';
import cors from 'cors';
import { ConfigService } from '@nestjs/config';
import { EnumAppEnvironment } from '@/common/constants/app.enum.constant';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  private readonly appEnv: EnumAppEnvironment;

  private readonly allowOrigin: string | boolean | string[];

  private readonly allowMethod: string[];

  private readonly allowHeader: string[];

  constructor(private readonly configService: ConfigService) {
    this.appEnv = this.configService.get<EnumAppEnvironment>('app.env');
    this.allowOrigin = this.configService.get<string | boolean | string[]>(
      'middleware.cors.allowOrigin',
    );
    this.allowMethod = this.configService.get<string[]>(
      'middleware.cors.allowMethod',
    );
    this.allowHeader = this.configService.get<string[]>(
      'middleware.cors.allowHeader',
    );
  }

  use(req: Request, res: Response, next: NextFunction): void {
    const allowOrigin = this.appEnv === EnumAppEnvironment.PRODUCTION ? this.allowOrigin : '*';
    const corsOptions: CorsOptions = {
      origin: allowOrigin,
      methods: this.allowMethod,
      allowedHeaders: this.allowHeader,
      preflightContinue: false,
      credentials: true,
      optionsSuccessStatus: HttpStatus.NO_CONTENT,
    };

    cors(corsOptions)(req, res, next);
  }
}
