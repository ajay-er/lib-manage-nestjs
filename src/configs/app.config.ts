import { registerAs } from '@nestjs/config';
import { EnumAppEnvironment } from '@/common/constants/app.enum.constant';
import {
  IsEnum,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsUrl,
  IsString,
} from 'class-validator';
import validateConfig from '@/common/utils/validate-config';

class AppConfigValidator {
  @IsEnum(EnumAppEnvironment)
  @IsOptional()
    APP_ENV: EnumAppEnvironment;

  @IsString()
  @IsOptional()
    APP_NAME: string;

  @IsUrl()
  @IsOptional()
    CORS_ORIGIN: string;

  @IsString()
  @IsOptional()
    HTTP_HOST: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
    HTTP_PORT: number;
}

export default registerAs('app', (): Record<string, unknown> => {
  validateConfig(process.env, AppConfigValidator);

  return {
    name: process.env.APP_NAME ?? 'nestjs-dev-app',
    env: process.env.APP_ENV ?? EnumAppEnvironment.DEVELOPMENT,
    debug: process.env.APP_DEBUG === 'true' ?? false,
    cors_origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
    host: process.env.HTTP_HOST ?? 'localhost',
    port: process.env.HTTP_PORT
      ? Number.parseInt(process.env.HTTP_PORT, 10)
      : 3000,
    versioning_enable: process.env.URL_VERSION_ENABLE === 'true' ?? false,
    globalPrefix:
    process.env.APP_ENV === EnumAppEnvironment.PRODUCTION
      ? '/api'
      : '/api',
  };
});
