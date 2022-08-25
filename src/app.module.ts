import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { EventHandleService } from './utils/service/eventHandle.service';
import { UtilsModule } from './utils/utils.module';
import { SseModule } from './modules/sse/sse.module';
import configuration from './config/configuration';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UserModule,
    UtilsModule,
    SseModule,
  ],
})
export class AppModule {}
