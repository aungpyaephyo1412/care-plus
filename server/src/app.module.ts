import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma/prisma.module';
import { AuthModule } from './features/auth/auth.module';
import { AuthGuard } from './features/auth/guards/auth.guard';
import { RolesGuard } from './features/auth/guards/roles.guard';
import { UsersModule } from './features/users/users.module';
import { PasswordService } from './util/password.service';
import { TwilioClientService } from './util/twilio-client.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_SECRET as string,
      signOptions: { expiresIn: process.env.JWT_AGE as string },
    }),
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // 1 sec
        limit: 5,
      },
      {
        name: 'medium',
        ttl: 10000, // 10 sec
        limit: 5,
      },
      {
        name: 'long',
        ttl: 60000, // 1 min
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    PasswordService,
    TwilioClientService,
  ],
})
export class AppModule {}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply().forRoutes('*');
//   }
// }
