import { Module } from '@nestjs/common';
import { EventHandleService } from './service/eventHandle.service';
import { PasswordEncodeService } from './service/password-encode.service';

@Module({
  providers: [EventHandleService, PasswordEncodeService],
  exports: [EventHandleService, PasswordEncodeService],
})
export class UtilsModule {}
