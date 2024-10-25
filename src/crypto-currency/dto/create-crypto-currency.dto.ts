import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDecimal, IsNumber, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateCryptoCurrencyDto {
    @IsString()
    @ApiProperty({ example: 'Bitcoin' })
    @IsNotEmpty({ message: 'Nome não informado' })
    name: string;

    @IsDateString()
    @ApiProperty({ example: '2024-10-25' })
    @IsNotEmpty({ message: 'Data do registro não informado' })
    date: Date;

    @IsDecimal()
    @ApiProperty({ example: 62000.00 })
    @IsNotEmpty({ message: 'Preço de abertura não informado' })
    open: number;

    @IsDecimal()
    @ApiProperty({ example: 63500.00 })
    @IsNotEmpty({ message: 'Preço de alta não informado' })
    high: number;

    @IsDecimal()
    @ApiProperty({ example: 61000.00 })
    @IsNotEmpty({ message: 'Preço de baixa não informado' })
    low: number;

    @IsDecimal()
    @ApiProperty({ example: 62800.00 })
    @IsNotEmpty({ message: 'Preço de fechamento não informado' })
    close: number;

    @IsNumber()
    @ApiProperty({ example: 21000000 })
    @IsNotEmpty({ message: 'Volume não informado' })
    volume: number;

    @IsString()
    @ApiProperty({ example: 'USD' })
    @IsNotEmpty({ message: 'Moeda de base não informada' })
    currency: string;
}