import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const pino: { pinoHttp: any } = {
          pinoHttp: {
            customProps: (req, res) => ({
              context: 'HTTP',
            }),
          },
        };

        if (configService.get('NODE_ENV') !== 'local') {
          return pino;
        }

        pino.pinoHttp.transport = {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            colorize: true,
            colorizeObjects: true,
            levelFirst: true,
            // translateTime: true,
          },
        };
        return pino;
      },
    }),
  ],
  exports: [LoggerModule],
})
export class CustomLoggerModule {}
