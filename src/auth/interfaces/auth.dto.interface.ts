export class LoginDto {
    email: string;
    password: string;
}

export class ValidUserDto {
    id?: number;
    email?: string;
}

export class ValidLoginDto {
    message?: string;
    accessToken?: string;
}