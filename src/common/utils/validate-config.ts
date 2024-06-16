import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import type { ClassConstructor } from 'class-transformer/types/interfaces';
import { Logger } from '@nestjs/common';

function validateConfig<T extends object>(
  config: Record<string, unknown>,
  envVariablesClass: ClassConstructor<T>,
) {
  const validatedConfig = plainToClass(envVariablesClass, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const logger = new Logger();
    logger.error('Invalid ENV!');
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export default validateConfig;
