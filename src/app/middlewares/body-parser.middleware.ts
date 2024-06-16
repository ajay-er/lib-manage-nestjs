/* eslint-disable max-classes-per-file */
import type { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UrlencodedBodyParserMiddleware implements NestMiddleware {
  private readonly maxFile: number;

  constructor(private readonly configService: ConfigService) {
    this.maxFile = this.configService.get<number>(
      'middleware.body.urlencoded.maxFileSize',
    );
  }

  use(req: Request, res: Response, next: NextFunction): void {
    bodyParser.urlencoded({
      extended: false,
      limit: this.maxFile,
    })(req, res, next);
  }
}

@Injectable()
export class JsonBodyParserMiddleware implements NestMiddleware {
  private readonly maxFile: number;

  constructor(private readonly configService: ConfigService) {
    this.maxFile = this.configService.get<number>(
      'middleware.body.json.maxFileSize',
    );
  }

  use(req: Request, res: Response, next: NextFunction): void {
    bodyParser.json({
      limit: this.maxFile,
    })(req, res, next);
  }
}

@Injectable()
export class RawBodyParserMiddleware implements NestMiddleware {
  private readonly maxFile: number;

  constructor(private readonly configService: ConfigService) {
    this.maxFile = this.configService.get<number>(
      'middleware.body.raw.maxFileSize',
    );
  }

  use(req: Request, res: Response, next: NextFunction): void {
    bodyParser.raw({
      limit: this.maxFile,
    })(req, res, next);
  }
}

@Injectable()
export class TextBodyParserMiddleware implements NestMiddleware {
  private readonly maxFile: number;

  constructor(private readonly configService: ConfigService) {
    this.maxFile = this.configService.get<number>(
      'middleware.body.text.maxFileSize',
    );
  }

  use(req: Request, res: Response, next: NextFunction): void {
    bodyParser.text({
      limit: this.maxFile,
    })(req, res, next);
  }
}
