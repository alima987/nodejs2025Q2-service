import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp({ login, password }: CreateUserDto) {
    const user = this.usersService.create({ login, password });
    return user;
  }

  async signIn(
    login: string,
    pass: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findOneByUsername(login);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const payload = { userId: user.id, login: user.login };
      return {
        accessToken: await this.generateAccessToken(
          payload.userId,
          payload.login,
        ),
        refreshToken: await this.generateRefreshToken(
          payload.userId,
          payload.login,
        ),
      };
    }
    throw new ForbiddenException();
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('No refreshToken in body');
    }
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      const newAccessToken = await this.generateAccessToken(
        payload.userId,
        payload.login,
      );
      const newRefreshToken = await this.generateRefreshToken(
        payload.userId,
        payload.login,
      );

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      throw new ForbiddenException('Invalid refresh token');
    }
  }
  async generateAccessToken(userId: string, login: string): Promise<string> {
    const payload = { userId, login };
    return await this.jwtService.signAsync(payload);
  }
  async generateRefreshToken(userId: string, login: string): Promise<string> {
    const payload = { userId, login };
    return await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
  }
}