import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";


export class RiskClassificationDto {
    @IsNumber()
    @IsNotEmpty({ message: 'Informe a baixa do período' })
    @ApiProperty({ example: 61000.00, description: 'Valor de baixa' })
    low: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Informe a alta do período' })
    @ApiProperty({ example: 63500.00, description: 'Valor de alta' })
    high: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Informe a abertura do período' })
    @ApiProperty({ example: 62000.00, description: 'Valor de abertura' })
    open: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Informe o fechamento do período' })
    @ApiProperty({ example: 62800.00, description: 'Valor de fechamento' })
    close: number;

    @IsNumber()
    @IsNotEmpty({ message: 'Informe o volume de transações do período' })
    @ApiProperty({ example: 21000000, description: 'Volume de transações' })
    volume: number;
}