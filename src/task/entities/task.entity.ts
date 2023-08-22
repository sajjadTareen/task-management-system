import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Status {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: Status, default: Status.TODO })
  status: Status;

  @Column('date')
  dueDate: Date;

  @Exclude()
  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
