import { IsNumber, IsString, IsNotEmpty, IsEmail } from "class-validator";

export class UpdateUserDto {
    @IsNumber()
    @IsNotEmpty({ message: 'Usuário não informado' })
    id: number;

    @IsEmail({}, { message: 'E-mail não informado' })
    email?: string;

    @IsString()
    @IsNotEmpty({ message: 'Nome do usuário não informado' })
    name?: string;
}