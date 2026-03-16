/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/auth.dto';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dtos/user.dto';
import { RolesService } from '../roles/services/roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
    private rolesService: RolesService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepo.findOne({
      where: { email },
      relations: ['roles'],
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        roles: user.roles,
      },
    };
  }

  async register(createUserDto: CreateUserDto) {
    const { email, password, idRoles, ...userData } = createUserDto;

    // Check if email already exists
    const existingUser = await this.userRepo.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException(`El email ${email} ya está en uso`);
    }

    // Find roles
    const roles = await this.rolesService.FindByIds(idRoles);
    if (roles.length !== idRoles.length) {
      throw new BadRequestException('Algunos roles no fueron encontrados');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = this.userRepo.create({
      ...userData,
      email,
      password: hashedPassword,
      roles,
    });

    const savedUser = await this.userRepo.save(newUser);

    // Return user without password
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pwd, ...result } = savedUser;
    return result;
  }
}
