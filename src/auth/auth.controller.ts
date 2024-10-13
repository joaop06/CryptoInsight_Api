import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from './jwt/jwt-auth-guard';
import { Post, Body, Controller } from '@nestjs/common';
import { ValidatedLoginDto } from './dto/validated-login.dto';



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('login')
    async login(@Body() object: LoginDto): Promise<ValidatedLoginDto> {
        const user = await this.authService.validateUser(object);

        if (!user) {
            return { message: 'Invalid credentials' };
        }

        return await this.authService.login(user);
    }
}
