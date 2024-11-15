import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateInvestmentDto {
  @IsNumber()
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'Usuário não informado' })
  userId: number;

  @IsNumber()
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'Criptomoeda não informada' })
  cryptoId: number;

  @IsNumber()
  @ApiProperty({ example: 2500.0 })
  @IsNotEmpty({ message: 'Valor de investimento não informado' })
  value: number;

  @IsString()
  @ApiProperty({ example: 'BTC' })
  @IsNotEmpty({ message: 'Símbolo Cryptomoeda (symbol) não informada' })
  symbol: string;
}
