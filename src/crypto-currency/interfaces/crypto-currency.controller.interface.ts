import { ControllerInterface } from "interfaces/controller.interface";
import { CryptoCurrencyEntity as Entity } from "../crypto-currency.entity";
import { CreateCryptoCurrencyDto } from '../dto/create-crypto-currency.dto';

export interface CryptoCurrencyControllerInterface extends ControllerInterface<
    Entity,
    CreateCryptoCurrencyDto
> { }