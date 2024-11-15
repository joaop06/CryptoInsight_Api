import { CryptoCurrencyEntity as Entity } from '../crypto-currency.entity';
import { CreateCryptoCurrencyDto } from '../dto/create-crypto-currency.dto';
import { ControllerInterface } from '../../../interfaces/controller.interface';

export interface CryptoCurrencyControllerInterface
  extends ControllerInterface<Entity, CreateCryptoCurrencyDto> {}
