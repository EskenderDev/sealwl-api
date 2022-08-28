import { Controller, Post, Req, UseGuards } from '@nestjs/common';

import { Observable, of, tap } from 'rxjs';
import { BasicUserDto } from '../user/dto/basic-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req): Observable<BasicUserDto> {
    return of(req.user);
  }
}
