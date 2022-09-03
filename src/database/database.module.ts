import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { catchError, of, tap } from 'rxjs';
import { User, UserSchema } from 'src/modules/user/entities/user.entity';
import { PasswordEncodeService } from 'src/utils/service/password-encode.service';
import { UtilsModule } from 'src/utils/utils.module';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: DatabaseService,
    }),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        imports: [UtilsModule],
        useFactory: (passwordEncode: PasswordEncodeService) => {
          const schema = UserSchema;
          schema.pre('save', function (next) {
            console.log('pre save');
            if (this.isModified('password')) {
              passwordEncode.hash(this.password).pipe(
                catchError((err) => {
                  console.log('error hash Password');
                  next(err);
                  return of();
                }),
                tap((hash) => {
                  console.log('hashpassword');
                  this.password = hash;
                  next();
                }),
              );
            }
          });
          return schema;
        },
        inject: [PasswordEncodeService],
      },
    ]),
  ],
})
export class DatabaseModule {}
