import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { users } from './user.storage';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { v4 as uuidv4, validate } from 'uuid';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  //private users = users;
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => {
      return this.getUserWithoutPassword(user);
    });
  }
  async findById(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    return await this.getUserWithoutPassword(user);
  }
  async findOneByUsername(login: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({ where: { login } });
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    return user;
  }
  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException('body does not contain required fields');
    }

    const newUser = await this.prisma.user.create({
      data: {
        login: createUserDto.login,
        password: await bcrypt.hash(createUserDto.password, 10),
        createdAt: +new Date().getTime(),
        updatedAt: +new Date().getTime(),
      },
    });

    return await this.getUserWithoutPassword(newUser);
  }
  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }

    if (!updatePasswordDto.oldPassword && !updatePasswordDto.newPassword) {
      throw new BadRequestException(
        'Old password or new password is not defined',
      );
    }

    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await bcrypt.compare(updatePasswordDto.oldPassword, user.password))) {
      throw new ForbiddenException('oldPassword is wrong');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: await bcrypt.hash(updatePasswordDto.newPassword, 10),
        updatedAt: +new Date().getTime(),
        version: {
          increment: 1,
        },
      },
    });

    return await this.getUserWithoutPassword(updatedUser);
  }
  async delete(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('invalid id (not uuid)');
    }
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('userId does not exist');
    }
    await this.prisma.user.delete({ where: { id } });
  }
  getUserWithoutPassword(user: User) {
    return {
      ...user,
      password: undefined,
    };
  }
}
