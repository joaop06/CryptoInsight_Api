import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail({}, { message: 'E-mail inválido' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Nome de usuário não informado' })
    name: string;

    @IsString()
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
    password: string;
}