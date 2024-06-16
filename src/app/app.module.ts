import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configs from '@/configs';
import { CommonModule } from '@/common/common.module';
import { AppMiddlewareModule } from './app.middleware.module';
import { RouterModule } from '@/router.module';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: false,
    }),
    AppMiddlewareModule,
    CommonModule,
    RouterModule,
  ],
  providers: [],
})
export class AppModule {}
