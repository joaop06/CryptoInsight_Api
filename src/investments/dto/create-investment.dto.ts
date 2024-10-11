import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreateInvestmentDto {
    @IsNumber()
    @IsNotEmpty()
    value: number;

    @IsString()
    @IsNotEmpty()
    symbol: string;

    @IsNumber()
    @IsNotEmpty()
    userId: number;
}