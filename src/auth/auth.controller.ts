import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from './jwt/jwt-auth-guard';
import { Post, Body, Controller } from '@nestjs/common';
import { Exception } from 'interceptors/exception.filter';
import { ValidatedLoginDto } from './dto/validated-login.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('login')
    async login(@Body() object: LoginDto): Promise<ValidatedLoginDto> {
        try {
            const user = await this.authService.validateUser(object);

            if (!user) new Exception({ message: 'Credenciais inválidas', statusCode: 401 });


            return await this.authService.login(user);

        } catch (error) {
            new Exception(error);
        }
    }
}
