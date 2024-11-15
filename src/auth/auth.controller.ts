import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { Public } from './jwt/jwt-auth-guard';
import { LoginDoc } from './dto/auth.documentation';
import { Post, Body, Controller } from '@nestjs/common';
import { ValidatedLoginDto } from './dto/validated-login.dto';
import { Exception } from '../../interceptors/exception.filter';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiBody(LoginDoc.body)
  @ApiOperation(LoginDoc.operation)
  @ApiOkResponse(LoginDoc.okResponse)
  @ApiBadRequestResponse(LoginDoc.badRequest)
  @ApiUnauthorizedResponse(LoginDoc.unauthorized)
  async login(@Body() object: LoginDto): Promise<ValidatedLoginDto> {
    try {
      const user = await this.authService.validateUser(object);

      if (!user)
        new Exception({ message: 'Credenciais inválidas', statusCode: 401 });

      return await this.authService.login(user);
    } catch (error) {
      new Exception(error);
    }
  }
}
