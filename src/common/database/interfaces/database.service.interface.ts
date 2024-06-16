import type { MongooseModuleOptions } from '@nestjs/mongoose';

export interface InterfaceDatabaseService {
  createOptions(): MongooseModuleOptions;
}
