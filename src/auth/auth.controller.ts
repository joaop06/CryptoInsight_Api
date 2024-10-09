import { Public } from './jwt-auth-guard';
import { AuthService } from './auth.service';
import { Post, Body, Controller } from '@nestjs/common';
import { LoginDto, ValidLoginDto } from './interfaces/auth.dto.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('login')
    async login(@Body() object: LoginDto): Promise<ValidLoginDto> {
        const user = await this.authService.validateUser(object);

        if (!user) {
            return { message: 'Invalid credentials' };
        }

        return await this.authService.login(user);
    }
}
