import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { Observable, throwIfEmpty } from 'rxjs';
import { BasicUserDto } from '../user/dto/basic-user.dto';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  validate(username: string, password: string): Observable<BasicUserDto> {
    return this.authService
      .validateUser(username, password)
      .pipe(throwIfEmpty(() => new UnauthorizedException()));
  }
}
