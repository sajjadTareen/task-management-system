import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  ParseUUIDPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entity/user.entity';
import { UserService } from '../services/user.service';
// import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const userId = req.user.id;
    return this.userService.updateUser(userId, updateUserDto);
  }
}
