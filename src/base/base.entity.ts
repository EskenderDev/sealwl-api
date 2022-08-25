import { Document } from 'mongoose';

export class BaseEntity {
  created_on: Date;
  updated_on: Date;
  created_by: string;
  updated_by: string;
}
