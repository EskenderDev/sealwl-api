import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  InjectConnection,
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { Connection } from 'mongoose';

type DatabaseConfig = {
  host: string;
  port: number;
  dbName: string;
  username: string;
  password: string;
  options: string[];
};

@Injectable()
export class DatabaseService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  private buildUri(): string {
    const { host, port, dbName, username, password } =
      this.configService.get<DatabaseConfig>('database');

    return `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`;
  }

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.buildUri(),
    };
  }
}
