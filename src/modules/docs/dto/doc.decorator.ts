/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels, ApiProduces, ApiResponse, getSchemaPath,
} from '@nestjs/swagger';
import { ResponseDto } from '@/common/response/dtos/response.dto';
import type { DocDefaultOptions, DocResponseOptions } from '@/modules/docs/interfaces/doc.interface';

export function DocDefault<T>(options: DocDefaultOptions<T>): MethodDecorator {
  const docs = [];
  const schema: Record<string, any> = {
    allOf: [{ $ref: getSchemaPath(ResponseDto) }],
    properties: {
      message: {
        example: options.messagePath,
      },
      statusCode: {
        type: 'number',
        example: options.statusCode,
      },
    },
  };

  if (options.dto) {
    docs.push(ApiExtraModels(options.dto as any));
    schema.properties = {
      ...schema.properties,
      data: {
        $ref: getSchemaPath(options.dto as any),
      },
    };
  }

  return applyDecorators(
    ApiExtraModels(ResponseDto),
    ApiResponse({
      description: options.httpStatus.toString(),
      status: options.httpStatus,
      schema,
    }),
    ...docs,
  );
}

export function DocResponse<T = void>(
  messagePath: string,
  options?: DocResponseOptions<T>,
): MethodDecorator {
  const docs: DocDefaultOptions = {
    httpStatus: options?.httpStatus ?? HttpStatus.OK,
    messagePath,
    statusCode: options?.statusCode ?? options?.httpStatus ?? HttpStatus.OK,
  };

  if (options?.dto) {
    docs.dto = options?.dto;
  }

  return applyDecorators(ApiProduces('application/json'), DocDefault(docs));
}
