import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtPayload } from "./jwt-payload.interface";
import { RegisterCredentialsDto } from "./dto/register-credentials.dto";
import { LoginCredentialsDto } from "./dto/login-crentials.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    // Promise jer je asynchrona metoda, a void jer nema povratne vrednosti
    async signUp(registerCredentialsDto: RegisterCredentialsDto): Promise<void> {
        const { username, password, email } = registerCredentialsDto;

        // Ovde pravimo usera
        const user = new User();
        user.username = username;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
        }
        catch (error) {
            // Ove error kodove mozemo da cuvamo kao Enum u nekom posebnom shared folderu/fajlu
            // duplicate username code - 23505
            // 409 je http code za Conflict
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            }
            else {
                throw new InternalServerErrorException();
            }
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    // async validateUserEmail(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    //     const { email } = authCredentialsDto;
    //     const user = await this.findOne({ email });

    //     if (user && await user.email) {
    //         return user.username;
    //     }
    //     else {
    //         return null;
    //     }

    // }

    async validateUserPassword(loginCredentialsDto: LoginCredentialsDto): Promise<string> {
        const { username, password } = loginCredentialsDto;
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            return user.username;
        }
        else {
            return null;
        }

    }
}