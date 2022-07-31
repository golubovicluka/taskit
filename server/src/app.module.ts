import { Module } from '@nestjs/common';
import { typeOrmConfig } from './typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig
  ), TasksModule, AuthModule],
})
export class AppModule { }