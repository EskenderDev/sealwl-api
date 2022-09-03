import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEntity } from '../../../base/base.entity';

export type UserDocument = User & Document;

@Schema()
export class User extends BaseEntity {
  @Prop()
  name: string;
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true, unique: true })
  password: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true, unique: true })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
