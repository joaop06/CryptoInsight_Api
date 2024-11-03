require('dotenv').config()
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from './auth/jwt/jwt-auth-guard';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InvestmentsModule } from './investments/investments.module';
import { CryptoCurrencyModule } from './crypto-currency/crypto-currency.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CryptoRiskModule } from './crypto-risk/crypto-risk.module';


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
    CryptoRiskModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule { }
