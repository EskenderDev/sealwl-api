import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { EMPTY, from, map, Observable, tap } from 'rxjs';

import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser(username: string, pass: string): Observable<any> {
    return from(this.usersService.findOne(username)).pipe(
      tap((user) => {
        console.log(user);
      }),
      map((user: User) => {
        if (user.password === pass) {
          const { password, ...result } = user;
          return result;
        }
        console.log('empty', user);
        return EMPTY;
      }),
      tap((user) => {
        console.log(user);
      }),
    );
  }
  login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
