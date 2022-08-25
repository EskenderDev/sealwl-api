import { Controller, Headers, MessageEvent, Sse } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { EventHandleService } from 'src/utils/service/eventHandle.service';

@Controller('sse')
export class SseController {
  constructor(private readonly eventHandle: EventHandleService) {}
  @Sse()
  sse(): Observable<MessageEvent> {
    return this.eventHandle.sendEvents().pipe(tap(console.log));
  }
}
