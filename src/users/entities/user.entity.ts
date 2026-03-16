import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Type } from 'class-transformer';
import { number } from 'joi';
import { IsInt } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name;

    @Column({ type: 'varchar', length: 255 })
    lastName;

    @Column({ type: 'varchar', length: 255 })
    docType;

    @Column({ type: 'varchar', length: 255 })
    docNumber;

    @Column({ type: 'varchar', length: 55 })
    miTest;

    @Column({ type: 'varchar', length: 255 })
    miTest2;

    @Column({ type: 'varchar', length: 255 })
    miTest3;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @ManyToMany(() => Role, (role) => role.users)
    @Type(() => number)
    @IsInt({each: true})
    @JoinTable({
        name: 'user_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'idroles' },
    })
    roles: Role[];
}
