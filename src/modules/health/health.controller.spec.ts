import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return application health status', () => {
    const response = controller.checkHealth();
    expect(response).toEqual({ status: 'ok' });
  });

  it('should return application status with uptime', () => {
    const response = controller.getStatus();
    expect(response).toEqual(
      expect.objectContaining({
        status: 'running',
        uptime: expect.any(Number),
      }),
    );
  });
});
