import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'src/user/entity/user.entity';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/user/services/user.service';
import { JwtPayload } from '../models/jwt-payload.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'yourSecretKey',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userService.getUserByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
