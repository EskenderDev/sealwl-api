import {
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { EventHandleService } from 'src/utils/service/eventHandle.service';
import { BaseEntity } from './base.entity';
import { IBaseService } from './iBase.service';

export class BaseController<T extends BaseEntity, C, U> {
  constructor(
    private readonly baseService: IBaseService<T, C, U>,
    private readonly eventHandle: EventHandleService,
  ) {}

  @Get()
  getAll() {
    return this.baseService.findAll();
  }

  @Get(':id')
  getCustomer(@Param('id') id: string): Observable<T> {
    return this.baseService.findOne(id);
  }

  @Post()
  add(@Body() t: C): Observable<T> {
    const createdResource = this.baseService.create(t);
    this.eventHandle.addEvent({ name: 'created', data: createdResource });
    return createdResource;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() t: U): Observable<T> {
    return this.baseService.update(id, t);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCustomer(@Param('id') id: string): void {
    this.baseService.delete(id);
  }
}
