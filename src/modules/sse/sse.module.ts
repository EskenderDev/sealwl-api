import { Module } from '@nestjs/common';
import { UtilsModule } from 'src/utils/utils.module';
import { SseController } from './sse.controller';

@Module({
  imports: [UtilsModule],
  controllers: [SseController],
})
export class SseModule {}
