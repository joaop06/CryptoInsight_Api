import { Public } from './jwt-auth-guard';
import { AuthService } from './auth.service';
import { Post, Body, Controller } from '@nestjs/common';
import { LoginDto } from 'src/users/interfaces/dto.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);

        if (!user) {
            return { message: 'Invalid credentials' };
        }

        return await this.authService.login(user);
    }
}
