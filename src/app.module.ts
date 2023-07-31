import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommonModule } from './common/common.module';
import { EnvConfiguration } from './common/config/env.config';
import { JoiValidationSchema } from './common/config/joi.validation';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    DatabaseModule,
    CustomLoggerModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    HealthModule,
    TodoModule,
    CommonModule,
  ],
})
export class AppModule {
  // implements NestModule (Logger con nest)
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes('*');
  // }
}

// LEGACY
// LoggerModule.forRootAsync({
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: (configService: ConfigService) => {
//     const pino: { pinoHttp: any } = {
//       pinoHttp: {
//         customProps: (req, res) => ({
//           context: 'HTTP',
//         }),
//       },
//     };
//
//     if (configService.get('NODE_ENV') !== 'local') {
//       return pino;
//     }
//
//     pino.pinoHttp.transport = {
//       target: 'pino-pretty',
//       options: {
//         singleLine: true,
//         colorize: true,
//         colorizeObjects: true,
//         levelFirst: true,
//         // translateTime: true,
//       },
//     };
//     return pino;
//   },
// }),
// TypeOrmModule.forRoot({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: +process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   autoLoadEntities: true,
//   synchronize: true,
// }),
