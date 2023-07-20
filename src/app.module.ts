import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [ConfigModule.forRoot(), HealthModule, TodoModule],
})
export class AppModule {}
