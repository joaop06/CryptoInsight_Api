import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto, ValidUserDto, ValidLoginDto } from './interfaces/auth.dto.interface';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(object: LoginDto): Promise<ValidUserDto> {
        const { email, password } = object
        const user = await this.usersService.findOneByEmail(email);

        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(user: ValidUserDto): Promise<ValidLoginDto> {
        const payload = { email: user.email, sub: user.id };

        return { accessToken: this.jwtService.sign(payload) };
    }
}
