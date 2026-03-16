import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto, UpdateRoleDto } from '../../dtos/role.dto';
import { RolesService } from '../../services/roles/roles.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@ApiTags('roles')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  getRoles() {
    return this.rolesService.findAll();
  }

  @Get(':roleId')
  getOne(@Param('roleId', ParseIntPipe) roleId: number) {
    return this.rolesService.findOne(roleId);
  }

  @Post()
  createRole(@Body() payload: CreateRoleDto) {
    return this.rolesService.createRole(payload);
  }

  @Put(':roleId')
  updateRole(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() payloadUpdated: UpdateRoleDto,
  ) {
    return this.rolesService.updateRole(roleId, payloadUpdated);
  }

  @Delete(':roleId')
  deleteRole(@Param('roleId', ParseIntPipe) roleId: number) {
    return this.rolesService.deleteRole(roleId);
  }
}
