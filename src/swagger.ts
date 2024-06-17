import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { NestApplication } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

export const swaggerApp = async (app: NestApplication) => {
  const configService = app.get(ConfigService);
  const appName: string = configService.get<string>('app.name');

  const logger = new Logger();

  const docPrefix = '/docs';
  const docDescription = 'My API docs- lib-manage API';
  const docVersion = '1.0';

  const documentBuild = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(docDescription)
    .setVersion(docVersion)
    .addServer('/')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'accessToken',
    )
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'refreshToken',
    )
    .build();

  const document = SwaggerModule.createDocument(app, documentBuild, {
    deepScanRoutes: true,
  });

  const filePath = resolve(__dirname, 'swagger.json');
  writeFileSync(filePath, JSON.stringify(document));

  SwaggerModule.setup(docPrefix, app, document, {
    jsonDocumentUrl: `${docPrefix}/json`,
    yamlDocumentUrl: `${docPrefix}/yaml`,
    explorer: true,
    customSiteTitle: appName,
    swaggerOptions: {
      docExpansion: 'none',
      persistAuthorization: true,
      displayOperationId: true,
      operationsSorter: 'method',
      tagsSorter: 'alpha',
      tryItOutEnabled: true,
      filter: true,
      deepLinking: true,
    },
  });

  logger.log('==========================================================');

  logger.log(`Docs will serve on ${docPrefix}`, 'NestApplication');

  logger.log('==========================================================');
};
