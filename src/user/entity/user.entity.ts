import { Task } from 'src/task/entities/task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @ApiHideProperty()
  @Column()
  password: string;

  @Exclude()
  @ApiHideProperty()
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
