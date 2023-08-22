import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = this.userRepository.create({
        password: hashedPassword,
        ...rest,
      });
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(error.detail);
      }
    }
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);
    try {
      Object.assign(user, updateUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(error.detail);
      }
    }
  }
}
