import { AppModule } from '@/app/app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { NestApplication } from '@nestjs/core';
import { NestFactory } from '@nestjs/core';
import { swaggerApp } from '@/swagger';

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');
  const host = configService.get<string>('app.host');
  const appName = configService.get<string>('app.name');
  const databaseUri = configService.get<string>('database.uri');
  const globalPrefix: string = configService.get<string>('app.globalPrefix');
  const versionEnable: string = configService.get<string>(
    'app.versioning_enable',
  );

  const logger = new Logger();

  // Global
  app.setGlobalPrefix(globalPrefix, {
    exclude: ['/health', '/health/status'],
  });

  app.useGlobalPipes(new ValidationPipe());

  // Versioning
  if (versionEnable) {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
      prefix: 'v',
    });
  }

  await swaggerApp(app);

  await app.listen(port, host);

  logger.log('==========================================================');
  logger.log(appName, 'NestApplication');
  logger.log('==========================================================');
  logger.log(`Http Server running on ${await app.getUrl()}`, 'NestApplication');
  logger.log('==========================================================');
  logger.log(`Database uri ${databaseUri}`, 'NestApplication');
  logger.log('==========================================================');
}
bootstrap();
