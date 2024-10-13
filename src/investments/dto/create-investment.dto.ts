import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreateInvestmentDto {
    @IsNumber()
    @IsNotEmpty({ message: 'Valor de investimento não informado' })
    value: number;

    @IsString()
    @IsNotEmpty({ message: 'Símbolo Cryptomoeda não informada' })
    symbol: string;

    @IsNumber()
    @IsNotEmpty({ message: 'Usuário não informado' })
    userId: number;
}