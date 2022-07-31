import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { RegisterCredentialsDto } from './dto/register-credentials.dto';
import { LoginCredentialsDto } from './dto/login-crentials.dto';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');
    constructor(
        // Dependency injection - ovde ubrizgavamo UserRepository
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    /* Koristimo this.userRepository jer smo ga ubrizgali putem @InjectRepository(UserRepository)
        sto znaci da je ovaj userRepository za nas kao dependency injection
        i da mozemo da koristimo metode koje je kreirao UserRepository
    */
    async signUp(registerCredentialsDto: RegisterCredentialsDto): Promise<void> {
        return this.userRepository.signUp(registerCredentialsDto);
    }

    async signIn(loginCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string, loggedIn: boolean }> {
        const username = await this.userRepository.validateUserPassword(loginCredentialsDto);

        if (!username) {
            // throw new UnauthorizedException('Invalid credentials');
            return {
                accessToken: null,
                loggedIn: false
            }
        }

        const payload: JwtPayload = { username };
        const accessToken = this.jwtService.sign(payload);
        this.logger.debug(`Generated JWT Token with payload ${JSON.stringify(payload)}`)

        console.log(accessToken)
        return { accessToken, loggedIn: true };
    }
}
