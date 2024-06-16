import { registerAs } from '@nestjs/config';
import { IsBoolean, IsOptional, ValidateIf } from 'class-validator';
import validateConfig from '@/common/utils/validate-config';

class DatabaseConfigValidator {
  @ValidateIf((envValues) => envValues.DATABASE_URL)
  @IsOptional()
    DATABASE_URI: string;

  @IsBoolean()
  @IsOptional()
    DATABASE_DEBUG: boolean;
}

export default registerAs('database', (): Record<string, unknown> => {
  validateConfig(process.env, DatabaseConfigValidator);
  return {
    uri:
      process.env.DATABASE_URI
      ?? 'mongodb://localhost:27017,localhost:27018,localhost:27019',
    debug: process.env.DATABASE_DEBUG === 'true',
    timeoutOptions: {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 10000,
      heartbeatFrequencyMS: 30000,
    },
  };
});
