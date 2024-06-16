import { Injectable } from '@nestjs/common';
import type { MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { EnumAppEnvironment } from '@/common/constants/app.enum.constant';
import type { InterfaceDatabaseService } from '@/common/database/interfaces/database.service.interface';

@Injectable()
export class DatabaseService implements InterfaceDatabaseService {
  constructor(private readonly configService: ConfigService) {}

  createOptions(): MongooseModuleOptions {
    const env = this.configService.get<string>('app.env');
    const uri = this.configService.get<string>('database.uri');
    const isDebug = this.configService.get<boolean>('database.debug');

    const timeoutOptions = this.configService.get<Record<string, number>>(
      'database.timeoutOptions',
    );

    if (env !== EnumAppEnvironment.PRODUCTION) {
      mongoose.set('debug', isDebug);
    }

    const mongooseOptions: MongooseModuleOptions = {
      uri,
      autoCreate: false,
      autoIndex: false,
      ...timeoutOptions,
    };

    return mongooseOptions;
  }
}
