import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/services/user.service';
import { JwtPayload } from '../models/jwt-payload.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);

    if (user && (await user.comparePassword(password))) {
      return user;
    }

    return null;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload: JwtPayload = {
      email: user.email,
      userId: user.id,
      username: user.username,
    };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
