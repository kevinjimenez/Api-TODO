import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  checkHealth() {
    return {
      message: 'api-todo is up and running',
      env: process.env.NODE_ENV || 'local',
      port: process.env.PORT || '3000',
    };
  }
}
