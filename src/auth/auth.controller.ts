import { AuthService } from './auth.service';
import { Post, Body, Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: { email: string; password: string }) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);

        if (!user) {
            return { message: 'Invalid credentials' };
        }

        return await this.authService.login(user);
    }
}
