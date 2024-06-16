import { Module } from '@nestjs/common';
import { RequestModule } from '@/common/request/request.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from '@/common/database/constants/database.constant';
import { DatabaseModule } from '@/common/database/database.module';
import { DatabaseService } from '@/common/database/services/database.service';

@Module({
  controllers: [],
  providers: [],
  imports: [RequestModule.forRoot(),
    MongooseModule.forRootAsync({
      connectionName: DATABASE_CONNECTION_NAME,
      imports: [DatabaseModule],
      inject: [DatabaseService],
      useFactory: (databaseService: DatabaseService) => databaseService.createOptions(),
    }),
  ],
})
export class CommonModule {}
