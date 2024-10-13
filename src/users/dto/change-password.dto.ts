import { IsNumber, IsString, IsNotEmpty, MinLength } from "class-validator";

export class ChangePasswordDto {
    @IsNumber()
    @IsNotEmpty({ message: 'Usuário não informado' })
    userId: number;

    @IsString()
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
    oldPassword: string;

    @IsString()
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
    newPassword: string;
}