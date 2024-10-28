// src/users/users.module.ts
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SignupValidationMiddleware } from './middlewares/signup-validation.middleware';
import { WinstonModule } from 'nest-winston';
import { createLogger, format, transports } from 'winston';
import { Users } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([Users]),
    WinstonModule.forRoot({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'combined.log' }),
      ],
    }),
  ],
  exports: [UsersService]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignupValidationMiddleware).forRoutes('users/signup');
  }
}
