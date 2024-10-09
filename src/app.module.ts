require('dotenv').config()
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/jwt-auth-guard';
import { InvestmentsModule } from './investments/investments.module';
import { InvestmentsService } from './investments/investments.service';
import { InvestmentsController } from './investments/investments.controller';
import { CryptoCurrencyModule } from './crypto-currency/crypto-currency.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      port: parseInt(process.env.DB_PORT),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    CryptoCurrencyModule,
    InvestmentsModule,
  ],
  controllers: [AppController, InvestmentsController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule { }
