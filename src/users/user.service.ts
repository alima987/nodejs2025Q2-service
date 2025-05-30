import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { users } from './user.storage';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { v4 as uuidv4 } from 'uuid';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  private users = users;
  findAll(): User[] {
    return this.users;
  }
  findById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }
  create(createUserDto: CreateUserDto): User {
    const newUser = new User({
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    this.users.push(newUser);
    return newUser;
  }
  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException(`Old password is incorrect`);
    }
    user.password = updatePasswordDto.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;
    return plainToInstance(User, user);
  }
  delete(id: string): void {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.splice(userIndex, 1);
  }
}
