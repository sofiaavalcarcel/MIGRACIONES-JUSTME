/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'ADMIN', description: 'Nombre del rol' })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Rol con acceso total', description: 'Descripción del rol', required: false })
  readonly description?: string;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
