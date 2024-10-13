import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCryptoCurrencyDto {
    @IsString()
    @IsNotEmpty({ message: 'Nome não informado' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'Símbolo informado' })
    symbol: string;

    @IsNumber()
    @IsNotEmpty({ message: 'Preço não informado' })
    price: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Capitalização de Mercado (marketCap) não informada' })
    marketCap: number;
}