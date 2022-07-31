import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-crentials.dto';
import { RegisterCredentialsDto } from './dto/register-credentials.dto';


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    // register
    @Post('/signup')
    signUp(@Body(ValidationPipe) registerCredentialsDto: RegisterCredentialsDto): Promise<void> {
        return this.authService.signUp(registerCredentialsDto);
    }

    // login
    @Post('/signin')
    signIn(@Body(ValidationPipe) loginCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(loginCredentialsDto);
    }
}
