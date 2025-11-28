import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { NoSqlInjection } from '../../common/validators/no-sql-injection.decorator';



export class LoginUserDto {

    @ApiProperty()
    @IsString()
    @IsEmail()
    @NoSqlInjection()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;


    
}