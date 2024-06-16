import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import {
  JsonBodyParserMiddleware,
  TextBodyParserMiddleware,
  RawBodyParserMiddleware,
  UrlencodedBodyParserMiddleware,
} from '@/app/middlewares/body-parser.middleware';
import { CorsMiddleware } from '@/app/middlewares/cors.middleware';
import { HelmetMiddleware } from '@/app/middlewares/helmet.middleware';
import {
  AppGeneralFilter,
  AppHttpFilter,
  AppValidationFilter,
} from '@/app/filters';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AppGeneralFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AppValidationFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AppHttpFilter,
    },
  ],
})
export class AppMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        HelmetMiddleware,
        JsonBodyParserMiddleware,
        TextBodyParserMiddleware,
        RawBodyParserMiddleware,
        UrlencodedBodyParserMiddleware,
        CorsMiddleware,
      )
      .forRoutes('*');
  }
}
