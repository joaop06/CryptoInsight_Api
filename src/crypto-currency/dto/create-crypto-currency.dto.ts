import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCryptoCurrencyDto {
    @IsString()
    @ApiProperty({ example: 'Bitcoin' })
    @IsNotEmpty({ message: 'Nome não informado' })
    name: string;

    @IsString()
    @ApiProperty({ example: 'BTC' })
    @IsNotEmpty({ message: 'Símbolo informado' })
    symbol: string;

    @IsNumber()
    @ApiProperty({ example: 63000.00 })
    @IsNotEmpty({ message: 'Preço não informado' })
    price: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ example: 63000.00, required: false })
    marketCap?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ example: 20000000.00, required: false })
    circulatingSupply?: number;
}