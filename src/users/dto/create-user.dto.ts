import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'joao@test.com' })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'João Borges' })
  @IsNotEmpty({ message: 'Nome de usuário não informado' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'test123' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;
}
