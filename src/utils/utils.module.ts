import { Module } from '@nestjs/common';
import { EventHandleService } from './service/eventHandle.service';

@Module({
  providers: [EventHandleService],
  exports: [EventHandleService],
})
export class UtilsModule {}
