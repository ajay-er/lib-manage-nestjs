import { ApiResponse } from '@/common/response/decorators/response.decorator';
import {
  Controller, Get, HttpStatus, VERSION_NEUTRAL,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheckResponse } from '@/modules/health/dto/health-check.dto';
import { StatusResponse } from '@/modules/health/dto/status.dto';
import { DocResponse } from '@/modules/docs/dto/doc.decorator';

@ApiTags('health')
@Controller({ version: VERSION_NEUTRAL, path: '/health' })
export class HealthController {
  @DocResponse('Application is healthy', {
    httpStatus: HttpStatus.OK,
    dto: HealthCheckResponse,
  })

  @Get()
  @ApiResponse('Application is healthy')
  checkHealth() {
    return { status: 'ok' };
  }

  @DocResponse('Application status retrieved successfully', {
    httpStatus: HttpStatus.OK,
    dto: StatusResponse,
  })
  @Get('/status')
  @ApiResponse('Application status retrieved successfully')
  getStatus() {
    return { status: 'running', uptime: process.uptime() };
  }
}
