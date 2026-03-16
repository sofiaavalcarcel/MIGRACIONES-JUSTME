/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'ADMIN', description: 'Nombre del rol' })
  readonly nombre: string;}
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
