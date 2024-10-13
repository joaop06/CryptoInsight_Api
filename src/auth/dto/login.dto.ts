import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'E-mail inválido' })
    email: string;

    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
    password: string;
}