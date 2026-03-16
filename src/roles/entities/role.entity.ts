import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  idroles: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
