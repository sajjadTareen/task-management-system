import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
