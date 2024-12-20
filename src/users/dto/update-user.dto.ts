import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'E-mail não informado' })
  email?: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome do usuário não informado' })
  name?: string;
}
