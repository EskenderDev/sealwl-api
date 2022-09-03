import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { from, map, Observable } from 'rxjs';

@Injectable()
export class PasswordEncodeService {
  hash(password: string): Observable<string> {
    const saltOrRounds = 10;

    return from(bcrypt.genSalt(saltOrRounds)).pipe(
      map((salt) => bcrypt.hashSync(password, salt)),
    );
  }
  compareTo(rawPassword: string, hashPassword: string): Observable<boolean> {
    return from(bcrypt.compare(rawPassword, hashPassword));
  }
}
