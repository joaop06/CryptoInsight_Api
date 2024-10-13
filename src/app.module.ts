require('dotenv').config()

import * as fs from 'fs';
import * as path from 'path';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt/jwt-auth-guard';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InvestmentsModule } from './investments/investments.module';
import { CryptoCurrencyModule } from './crypto-currency/crypto-currency.module';

import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { InvestmentsController } from './investments/investments.controller';
import { CryptoCurrencyController } from './crypto-currency/crypto-currency.controller';


/**
 * Busca e importa em todo o projeto arquivos '.service.ts'
 * @returns {ServiceModules}
 */
function loadFiles(fileTs: string, fileJs: string, typeFile: string = 'service' | 'controller'): Provider[] {
  const services: Provider[] = [];
  const modulesPath = path.join(__dirname);

  // Percorre cada pasta  em 'src'
  fs.readdirSync(modulesPath).forEach(folder => {
    const folderPath = path.join(modulesPath, folder);

    if (fs.lstatSync(folderPath).isDirectory()) {
      const serviceFiles = fs
        .readdirSync(folderPath)
        .filter(file => file.endsWith(fileTs) || file.endsWith(fileJs));

      // Importa cada Service e adiciona aos Prividers
      serviceFiles.forEach(file => {
        const serviceModule = require(path.join(folderPath, file));
        const serviceName = Object.keys(serviceModule)[0];
        services.push({ provide: serviceName, useClass: serviceModule[serviceName] });
      })
    }
  })

  return services;
}

@Module({
  imports: [
    AuthModule,
    UsersModule,
    InvestmentsModule,
    CryptoCurrencyModule,
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
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }, ...loadFiles('.service.ts', '.service.js')],
  // controllers: [AuthController, UsersController, InvestmentsController, CryptoCurrencyController],
  controllers: [...loadFiles('.service.ts', '.service.js')],
})
export class AppModule { }
