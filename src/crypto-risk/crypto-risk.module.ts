import { Module } from '@nestjs/common';
import { CryptoRiskService } from './crypto-risk.service';
import { CryptoRiskController } from './crypto-risk.controller';
import { CryptoCurrencyModule } from 'src/crypto-currency/crypto-currency.module';

@Module({
  exports: [CryptoRiskService],
  providers: [CryptoRiskService],
  imports: [CryptoCurrencyModule],
  controllers: [CryptoRiskController],
})
export class CryptoRiskModule { }
