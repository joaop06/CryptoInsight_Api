import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Injectable } from '@nestjs/common';
import { ValidUserDto } from './dto/valid-user.dto';
import { UsersService } from '../users/users.service';
import { ValidatedLoginDto } from './dto/validated-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(object: LoginDto): Promise<ValidUserDto> {
    const { email, password } = object;
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      return user;
    }

    return null;
  }

  async login(user: ValidUserDto): Promise<ValidatedLoginDto> {
    const payload = { email: user.email, sub: user.id };

    return {
      message: 'Login realizado com sucesso!',
      accessToken: this.jwtService.sign(payload),
    };
  }
}
