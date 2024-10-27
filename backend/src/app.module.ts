import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { createLogger, format, transports } from 'winston';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    WinstonModule.forRoot({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
      transports: [
        new transports.Console({ level: 'info' }),
        new transports.File({ filename: 'combined.log', level: 'info' }),
      ],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
