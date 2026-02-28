import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto';
import { Role } from '../../../roles/entities/role.entity';
import { CreateRoleDto } from 'src/roles/dtos/role.dto';
import { RolesService } from '../../../roles/services/roles/roles.service';

@Injectable()
export class UsersService {

    users: User[] = [];
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        //@InjectRepository(Role) private roleRepo: Repository<Role>,
        private rolesservice: RolesService
    ){}

    async findAll(){
        this.users = await this.userRepo.find({ relations: ['roles'] });
        return this.users;
    }

    async findOne(userId: number){
        const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['roles'] });
        if (!user) {
            throw new NotFoundException(`User #${userId} not found`);
        }
        return user;
    }


    async updateUser(id: number, payloadUpdated: UpdateUserDto){
        const user = await this.userRepo.findOne({where:{id}});
        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        this.userRepo.merge(user, payloadUpdated);
        return this.userRepo.save(user);
    }

    deleteUser(idUser: number){
        return this.userRepo.delete(idUser);
    }

    async addRoleToUser(payload: CreateUserDto){

        const{ idRoles, ...userdata } = payload;
        const roles = await this.rolesservice.FindByIds(idRoles);


        if (roles.length !== idRoles.length){
            throw new NotFoundException('Algunos roles no fueron encontrados')
        }

        const newusers = this.userRepo.create({
            ...userdata, roles,
        })
        return this.userRepo.save(newusers)

    }


}
