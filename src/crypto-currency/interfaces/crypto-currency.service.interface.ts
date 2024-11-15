import { ServiceInterface } from '../../../interfaces/service.interface';
import { CryptoCurrencyEntity as Entity } from '../crypto-currency.entity';
import { CreateCryptoCurrencyDto } from '../dto/create-crypto-currency.dto';

export interface CryptoCurrencyServiceInterface
  extends ServiceInterface<Entity, CreateCryptoCurrencyDto> {}
