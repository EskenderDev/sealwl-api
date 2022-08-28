import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { EventHandleService } from 'src/utils/service/eventHandle.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly eventHandle: EventHandleService,
  ) {}

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  getCustomer(@Param('id') id: string): Observable<User> {
    return this.userService.findOne(id);
  }

  @Post()
  add(@Body() t: CreateUserDto): Observable<User> {
    return this.userService.create(t).pipe(
      tap((resource: User) =>
        this.eventHandle.addEvent({
          type: 'create_user',
          data: resource,
        }),
      ),
    );
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() t: UpdateUserDto): Observable<User> {
    return this.userService.update(id, t).pipe(
      tap((resource: User) =>
        this.eventHandle.addEvent({
          name: 'update_user',
          data: resource,
        }),
      ),
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteCustomer(@Param('id') id: string): void {
    this.userService.delete(id);
  }
}
