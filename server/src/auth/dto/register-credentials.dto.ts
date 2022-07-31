import { IsNotEmpty, MaxLength, Min, MinLength, IsString, Matches, IsEmail } from 'class-validator';

/* class-validator has the following decorators:
    IsNotEmpty,IsIn,IsOptional,IsEmail,IsUrl,IsDate,
    IsArray,IsBoolean,IsNumber,IsString,IsEnum,IsInstance,
    IsDateString,IsJSON,IsLatLong,IsLatitude,IsLongitude,IsPostalCode,
*/

export class RegisterCredentialsDto {
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password too weak' }
    )
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

}