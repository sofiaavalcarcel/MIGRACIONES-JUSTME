/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsArray, IsEmail, MinLength } from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateUserDto {   
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly lastName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly docType: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly docNumber: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly miTest: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly miTest2: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly miTest3: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'usuario@email.com', description: 'Correo electrónico único del usuario' })
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({ example: 'password123', description: 'Contraseña (mínimo 6 caracteres)' })
    readonly password: string;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    readonly idRoles: number[];
}


export class UpdateUserDto extends PartialType(CreateUserDto){}
