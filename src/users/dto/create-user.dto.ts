import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {

    @ApiProperty({ example: "user@email.ru", description: "Почта" })
    @IsString({ message: "Должно быть строкой" })
    @IsEmail({}, { message: "Некорректный email" })
    readonly email: string;

    @ApiProperty({ example: "12345", description: "Пароль" })
    @IsString({ message: "Должно быть строкой" })
    @Length(4, 16)
    readonly password: string;
}