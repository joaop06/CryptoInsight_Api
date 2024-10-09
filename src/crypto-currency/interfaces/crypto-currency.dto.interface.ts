import { DeleteDto } from "interfaces/dto/delete.dto";
import { CryptoCurrencyEntity } from "../crypto-currency.entity";
import { CreateReturnDto } from '../../../interfaces/dto/create.dto';
import { UpdateReturnDto } from '../../../interfaces/dto/update.dto';
import { FindOneDto, FindOneReturnDto, FindAllDto, FindAllReturnDto } from '../../../interfaces/dto/find.dto';

export class DeleteCryptoCurrencyDto implements DeleteDto {
    id: string;
}

export class CreateCryptoCurrencyReturnDto implements CreateReturnDto<CryptoCurrencyEntity> {
    result: CryptoCurrencyEntity;
}

export class UpdateCryptoCurrencyDto {
    name?: string;
    email?: string;
    password: undefined;
}

export class UpdateCryptoCurrencyReturnDto implements UpdateReturnDto<CryptoCurrencyEntity> {
    result: Partial<CryptoCurrencyEntity>;
}

export class FindOneCryptoCurrencyDto implements FindOneDto {
    id: string;
}

export class FindOneCryptoCurrencyReturnDto implements FindOneReturnDto<CryptoCurrencyEntity> {
    result: CryptoCurrencyEntity;
}

export class FindAllCryptoCurrencyDto implements FindAllDto<CryptoCurrencyEntity> { }

export class FindAllCryptoCurrencyReturnDto implements FindAllReturnDto<CryptoCurrencyEntity> {
    count: number;
    rows: CryptoCurrencyEntity[];
}