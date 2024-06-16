import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from '@/common/response/interceptors/response.interceptor';
import { RESPONSE_MESSAGE } from '@/common/response/constants/response.constant';

export function Response(message?: string): MethodDecorator {
  return applyDecorators(
    UseInterceptors(ResponseInterceptor),
    SetMetadata(RESPONSE_MESSAGE, message),
  );
}
