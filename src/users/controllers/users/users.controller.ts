import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto';
import { UsersService } from '../../services/users/users.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){}

    @Get()
    getUsers() {
        
        return this.usersService.findAll();
    }

    
    @Get(':userId')
    getOne(@Param('userId', ParseIntPipe) userId: number){
        return this.usersService.findOne(userId);
    }


    @Put(':userId')
    updateUser(@Param('userId', ParseIntPipe) userId: number, @Body() payloadUpdated: UpdateUserDto){
        return this.usersService.updateUser(userId, payloadUpdated);
    }

    @Delete(':userId')
    deleteUser(@Param('userId', ParseIntPipe) userId: number){
        this.usersService.deleteUser(userId);
    }

    @Post()
    addRoleToUser(
        //@Param('userId', ParseIntPipe) userId: number,
        @Body() payload: CreateUserDto
    ){
        
        return this.usersService.addRoleToUser(payload);
    }

}
