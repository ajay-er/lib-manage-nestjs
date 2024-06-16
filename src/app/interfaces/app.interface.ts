import type { ValidationError } from 'class-validator';

export interface AppException {
  statusCode: number;
  message: string;
  errors?: unknown[] | ValidationError[];
  data?: Record<string, unknown>;
}
