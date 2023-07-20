import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HealthService {
  constructor(private readonly configService: ConfigService) {}
  checkHealth() {
    return {
      message: 'api-todo is up and running',
      env: this.configService.get('NODE_ENV'),
      port: this.configService.get('PORT'),
    };
  }
}
