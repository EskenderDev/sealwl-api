import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from 'src/base/base.entity';

export class BasicUserDto extends BaseEntity {
  @IsNotEmpty()
  name: string;
}
