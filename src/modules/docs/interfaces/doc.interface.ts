import type { HttpStatus } from '@nestjs/common';
import type { ClassConstructor } from 'class-transformer';

export interface DocResponseOptions <T = void> {
  statusCode?: number;
  httpStatus?: HttpStatus;
  dto?: ClassConstructor<T> | ClassConstructor<T>[];
}

export interface DocOfOptions<T = void> {
  statusCode: number;
  messagePath: string;
  dto?: ClassConstructor<T>;
}

export interface DocDefaultOptions<T = void> extends DocOfOptions<T> {
  httpStatus: HttpStatus;
}
