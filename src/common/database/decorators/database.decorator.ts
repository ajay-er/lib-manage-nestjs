import type { SchemaOptions } from '@nestjs/mongoose';
import {
  InjectConnection,
  InjectModel,
  Schema,
} from '@nestjs/mongoose';
import {
  DATABASE_CONNECTION_NAME,
  DATABASE_CREATED_AT_FIELD_NAME,
  DATABASE_UPDATED_AT_FIELD_NAME,
} from '@/common/database/constants/database.constant';

export function DatabaseConnection(
  connectionName?: string,
): ParameterDecorator {
  return InjectConnection(connectionName ?? DATABASE_CONNECTION_NAME);
}

export function DatabaseModel(
  entity: string,
  connectionName?: string,
): ParameterDecorator {
  return InjectModel(entity, connectionName ?? DATABASE_CONNECTION_NAME);
}

export function DatabaseEntity(options?: SchemaOptions): ClassDecorator {
  return Schema({
    ...options,
    versionKey: false,
    timestamps: {
      createdAt: DATABASE_CREATED_AT_FIELD_NAME,
      updatedAt: DATABASE_UPDATED_AT_FIELD_NAME,
    },
  });
}
