import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/jwt/jwt-auth-guard';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    @Get()
    @Public()
    @ApiExcludeEndpoint()
    welcome(): string {
        return this.appService.welcome();
    }
}