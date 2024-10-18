import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoCurrencyEntity } from './crypto-currency.entity';
import { CryptoCurrencyService } from './crypto-currency.service';
import { CryptoCurrencyController } from './crypto-currency.controller';

@Module({
  exports: [CryptoCurrencyService],
  providers: [CryptoCurrencyService],
  controllers: [CryptoCurrencyController],
  imports: [TypeOrmModule.forFeature([CryptoCurrencyEntity])],
})
export class CryptoCurrencyModule { }
