import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  singup(dto: CreateUserDto) {
    this.userService.create(dto);
  }
  singin() {}
  logout() {}
  refreshToken() {}
}
